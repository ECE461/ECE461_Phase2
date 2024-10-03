module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/Metric Tests/**/*.tests.ts'],     // look for test files in metric test folder
    collectCoverage: true,                      // collect coverage
    moduleDirectories: ['node_modules', 'src'],        // import the modules
    rootDir: './',                              // specify root directories
    coverageReporters: ['json'],
    collectCoverageFrom: ['src/*.ts'],       // where actual program files are
}