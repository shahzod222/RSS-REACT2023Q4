module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^next/router$': '<rootDir>/node_modules/next/dist/client/router.js',
  },
};
