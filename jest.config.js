module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/Metric Tests/**/*.ts'],     // look for test files in metric test folder
    collectCoverage: true,                      // collect coverage
    moduleDirectories: ['node_modules', 'src'],        // import the modules
    rootDir: './',                              // specify root directories
    collectCoverageFrom: ['src/*.ts'],       // where actual program files are
    coverageReporters: ['text'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 90,
            lines: 90,
            statements: 90,
        }
    }
}