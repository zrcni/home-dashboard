const fs = require('fs')
const path = require('path')

console.log('replace-sqlite3-bindings.js module loaded')

// This script replaces the default sqlite3 bindings with pre-built Raspberry Pi bindings.
// It's triggered by the `packageAfterCopy` hook in forge.config.ts.
module.exports = async ({ buildPath, arch }) => {
  console.log(`Entering replace-sqlite3-bindings function with arch: ${arch}`)
  // Only run this for armv7l builds
  if (arch !== 'armv7l') {
    console.log(
      'Skipping sqlite3 bindings replacement for non-armv7l architecture.',
    )
    return
  }

  console.log('Replacing sqlite3 bindings for armv7l...')

  const sqlite3NodeModulesPath = path.join(buildPath, 'node_modules', 'sqlite3')
  console.log(`sqlite3 path: ${sqlite3NodeModulesPath}`)
  const prebuiltBindingsPath = path.resolve(
    __dirname,
    '..',
    'lib',
    'rpi3-sqlite3',
  )
  console.log(`Prebuilt bindings path: ${prebuiltBindingsPath}`)

  // In Electron Forge, the `buildPath` is the root of the packaged app,
  // which contains node_modules directly. The `package.json` is also at this level.
  console.log(`Listing contents of buildPath: ${buildPath}`)
  try {
    console.log(fs.readdirSync(buildPath))
    console.log('Parent dir contents:')
    console.log(fs.readdirSync(path.join(buildPath, '..')))
  } catch (e) {
    console.log(`Could not list buildPath: ${e.message}`)
  }

  const appPackageJsonPath = path.join(buildPath, 'package.json')

  // Check if sqlite3 is likely to be present
  let shouldCheckSqlite3 = true
  if (fs.existsSync(appPackageJsonPath)) {
    try {
      const appPackageJson = JSON.parse(
        fs.readFileSync(appPackageJsonPath, 'utf8'),
      )
      if (
        !appPackageJson.dependencies ||
        !appPackageJson.dependencies.sqlite3
      ) {
        shouldCheckSqlite3 = false
      }
    } catch (e) {
      console.warn(`Error reading package.json: ${e.message}`)
    }
  } else {
    console.warn(
      `Warning: package.json not found at ${appPackageJsonPath}. Proceeding to check for sqlite3 module directly.`,
    )
  }

  if (!shouldCheckSqlite3) {
    console.error(
      'sqlite3 is not listed as a dependency. Skipping replacement.',
    )
    return
  }

  // Let's try to resolve the actual path to sqlite3's package.json
  let actualSqlite3Path
  try {
    // The `buildPath` is the directory where `node_modules` lives.
    const sqlite3PackageJsonPath = require.resolve('sqlite3/package.json', {
      paths: [buildPath],
    })
    actualSqlite3Path = path.dirname(sqlite3PackageJsonPath)
    console.log(`Resolved sqlite3 path to: ${actualSqlite3Path}`)
  } catch (e) {
    console.log(
      `require.resolve failed: ${e.message}. Checking standard node_modules path.`,
    )
    const standardPath = path.join(buildPath, 'node_modules', 'sqlite3')
    if (fs.existsSync(standardPath)) {
      actualSqlite3Path = standardPath
      console.log(`Found sqlite3 at: ${actualSqlite3Path}`)
    } else {
      console.error('Could not find sqlite3 module. Skipping replacement.')
      return
    }
  }

  const targetBuildPath = path.join(actualSqlite3Path, 'build')

  console.log('Contents of sqlite3 before modification:')
  try {
    console.log(fs.readdirSync(actualSqlite3Path))
  } catch (e) {
    console.log(`Could not list sqlite3 dir: ${e.message}`)
  }

  // Remove the existing 'build' directory in node_modules/sqlite3
  if (fs.existsSync(targetBuildPath)) {
    console.log(`Removing existing bindings at ${targetBuildPath}`)
    fs.rmSync(targetBuildPath, { recursive: true, force: true })
  }

  // Verify removal
  if (fs.existsSync(targetBuildPath)) {
    console.error(`FAILED to remove ${targetBuildPath}`)
    throw new Error(`Failed to remove ${targetBuildPath}`)
  } else {
    console.log(`Verified removal of ${targetBuildPath}`)
  }

  // Remove binding.gyp to prevent rebuilds
  const bindingGypPath = path.join(actualSqlite3Path, 'binding.gyp')
  if (fs.existsSync(bindingGypPath)) {
    console.log(`Removing binding.gyp at ${bindingGypPath}`)
    fs.rmSync(bindingGypPath, { force: true })
  }

  // Also remove lib/binding to ensure no x64 bindings remain
  const targetLibBindingPath = path.join(actualSqlite3Path, 'lib', 'binding')
  if (fs.existsSync(targetLibBindingPath)) {
    console.log(`Removing existing lib/binding at ${targetLibBindingPath}`)
    fs.rmSync(targetLibBindingPath, { recursive: true, force: true })
  }

  // Copy the pre-built bindings to lib/binding
  const sourceLibBindingPath = path.join(prebuiltBindingsPath, 'lib', 'binding')

  if (fs.existsSync(sourceLibBindingPath)) {
    console.log(
      `Copying pre-built bindings from ${sourceLibBindingPath} to ${targetLibBindingPath}`,
    )
    fs.mkdirSync(path.dirname(targetLibBindingPath), { recursive: true })
    fs.cpSync(sourceLibBindingPath, targetLibBindingPath, { recursive: true })

    // ALSO copy to build/Release/node_sqlite3.node to cover all bases
    // The error indicated it was looking here.
    const targetBuildReleasePath = path.join(
      actualSqlite3Path,
      'build',
      'Release',
    )
    if (!fs.existsSync(targetBuildReleasePath)) {
      fs.mkdirSync(targetBuildReleasePath, { recursive: true })
    }

    // Find the .node file in the source
    // We expect structure like lib/binding/napi-v6-linux-glibc-arm/node_sqlite3.node
    const bindingDirs = fs.readdirSync(sourceLibBindingPath)
    if (bindingDirs.length > 0) {
      const sourceNodeFile = path.join(
        sourceLibBindingPath,
        bindingDirs[0],
        'node_sqlite3.node',
      )
      if (fs.existsSync(sourceNodeFile)) {
        const targetNodeFile = path.join(
          targetBuildReleasePath,
          'node_sqlite3.node',
        )
        console.log(`Copying ${sourceNodeFile} to ${targetNodeFile}`)
        fs.copyFileSync(sourceNodeFile, targetNodeFile)
      } else {
        console.warn(`Could not find node_sqlite3.node in ${bindingDirs[0]}`)
      }
    }
  } else {
    console.error(`Could not find source bindings at ${sourceLibBindingPath}`)
    throw new Error('Source bindings not found')
  }

  console.log('Contents of sqlite3 after modification:')
  try {
    console.log(fs.readdirSync(actualSqlite3Path))
    if (fs.existsSync(targetLibBindingPath)) {
      console.log('Contents of lib/binding:')
      console.log(fs.readdirSync(targetLibBindingPath))
    }
  } catch (e) {
    console.log(`Could not list sqlite3 dir: ${e.message}`)
  }

  console.log('Successfully replaced sqlite3 bindings.')
}
