const baseConfig = require('./jest.config.base')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['src/lib', 'src/__integration-tests__'],
}
