import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerAppImage } from '@reforged/maker-appimage'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'
import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const config: ForgeConfig = {
  outDir: 'release/build',
  packagerConfig: {
    name: 'HomeDashboard',
    executableName: 'HomeDashboard',
    appBundleId: 'org.zrcni.HomeDashboard',
    asar: false,
    extraResource: ['./assets'],
    prune: false,
    ignore: [
      /^\/src/,
      /^\/scripts/,
      /^\/.erb/,
      /^\/.git/,
      /^\/.vscode/,
      /^\/release/,
      /^\/test/,
      /^\/tsconfig.json/,
      /^\/webpack.*/,
    ],
  },
  hooks: {
    packageAfterCopy: async (
      _config,
      buildPath,
      _electronVersion,
      _platform,
      arch,
    ) => {
      console.log('--- packageAfterCopy hook started ---')
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const replaceBindings = require('./scripts/replace-sqlite3-bindings.js')
        await replaceBindings({ buildPath, arch })
        console.log('--- packageAfterCopy hook finished successfully ---')
      } catch (err) {
        console.error('--- packageAfterCopy hook failed ---', err)
        // Re-throw the error to make sure the build fails
        throw err
      }
    },
  },
  rebuildConfig: {},
  makers: [
    new MakerAppImage({
      options: {
        bin: 'HomeDashboard',
      },
    }),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer/index.tsx',
            name: 'main_window',
            preload: {
              js: './src/main/preload.js',
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: false,
    }),
  ],
}

export default config
