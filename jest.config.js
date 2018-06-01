module.exports = {
  testMatch: [
    '**/project.test.ts',
    '**/*.spec.(ts|tsx|js)',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    }
  }
}
