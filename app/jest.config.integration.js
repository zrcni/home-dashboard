const baseConfig = require('./jest.config.base')

module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/src/__integration-tests__/**/*.(test|spec).(ts|js)'],
}
