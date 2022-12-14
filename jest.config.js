module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  '\\.js$': ['babel-jest', { configFile: './babel-jest.config.js' }],
  configurable: true
}
