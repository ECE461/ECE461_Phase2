"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.correctness = void 0;
var dotenv = require("dotenv");
require("es6-promise/auto");
require("isomorphic-fetch");
dotenv.config();
var GITHUB_API = 'https://api.github.com';
var NPM_API = 'https://registry.npmjs.org';
var correctness = /** @class */ (function () {
    function correctness(owner, repoName, packageName, packageVersion) {
        if (packageVersion === void 0) { packageVersion = 'latest'; }
        this.owner = owner;
        this.repoName = repoName;
        this.packageName = packageName;
        this.packageVersion = packageVersion;
        this.githubToken = process.env.GITHUB_TOKEN || '';
    }
    /**
     * Calculates the correctness score of the repository or package.
     * @returns {number} - the correctness score.
     * */
    correctness.prototype.getCorrectnessScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var readme, stability, tests, linters, dependencies, readmeWeight, stabilityWeight, testsWeight, lintersWeight, dependenciesWeight, weightedReadme, weightedStability, weightedTests, weightedLinters, weightedDependencies, finalScore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fetchPackageData()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.checkReadme()];
                    case 3:
                        readme = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkStability()];
                    case 4:
                        stability = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkTests()];
                    case 5:
                        tests = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkLinters()];
                    case 6:
                        linters = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkDependencies()];
                    case 7:
                        dependencies = (_a.sent()) ? 1 : 0;
                        readmeWeight = 0.25;
                        stabilityWeight = 0.25;
                        testsWeight = 0.3;
                        lintersWeight = 0.1;
                        dependenciesWeight = 0.1;
                        weightedReadme = readme * readmeWeight;
                        weightedStability = stability * stabilityWeight;
                        weightedTests = tests * testsWeight;
                        weightedLinters = linters * lintersWeight;
                        weightedDependencies = dependencies * dependenciesWeight;
                        finalScore = weightedReadme + weightedStability + weightedTests;
                        return [2 /*return*/, finalScore];
                }
            });
        });
    };
    /**
     * Fetches the contents of the github repository.
     * */
    correctness.prototype.fetchRepoContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(GITHUB_API, "/repos/").concat(this.owner, "/").concat(this.repoName, "/contents"), {
                            headers: {
                                'Authorization': "token ".concat(this.githubToken)
                            }
                        })];
                    case 1:
                        response = _b.sent();
                        _a = this;
                        return [4 /*yield*/, response.json()];
                    case 2:
                        _a.repoContents = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches the contents of the npm package.
     * */
    correctness.prototype.fetchPackageData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(NPM_API, "/").concat(this.packageName, "/").concat(this.packageVersion))];
                    case 1:
                        response = _b.sent();
                        _a = this;
                        return [4 /*yield*/, response.json()];
                    case 2:
                        _a.packageData = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if the repository or package has a README file.
     * @returns {boolean} - true if README exists, false otherwise.
     * */
    correctness.prototype.checkReadme = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.owner && this.repoName)) return [3 /*break*/, 3];
                        if (!!this.repoContents) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.repoContents.some(function (file) { return file.name.toLowerCase() === 'readme.md'; })];
                    case 3:
                        if (!this.packageName) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fetchPackageData()];
                    case 4:
                        _a.sent();
                        if (this.packageData && this.packageData.readme) {
                            return [2 /*return*/, 1];
                        }
                        else {
                            console.warn('No README found in package data');
                            return [2 /*return*/, 0];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, 0];
                }
            });
        });
    };
    /**
     * Checks if the repository or package has more than one release.
     * @returns {boolean} - true if there are more than one release, false otherwise.
     * */
    correctness.prototype.checkStability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var releasesUrl, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.owner && this.repoName)) return [3 /*break*/, 6];
                        releasesUrl = "".concat(GITHUB_API, "/repos/").concat(this.owner, "/").concat(this.repoName, "/releases");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(releasesUrl, {
                                headers: {
                                    'Authorization': "token ".concat(this.githubToken)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, data.length > 1];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error fetching releases:', error_1);
                        return [2 /*return*/, false];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        if (!this.packageName) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.fetchPackageData()];
                    case 7:
                        _a.sent();
                        if (this.packageData && this.packageData.versions) {
                            return [2 /*return*/, Object.keys(this.packageData.versions).length > 1];
                        }
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Checks if the repository or package has test files.
     * @returns {boolean} - true if test files exist, false otherwise.
     * */
    correctness.prototype.checkTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var testPatterns_1, testPatterns_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.owner && this.repoName)) return [3 /*break*/, 3];
                        if (!!this.repoContents) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        testPatterns_1 = [/test/i, /spec/i, /^__tests__$/i];
                        return [2 /*return*/, this.repoContents.some(function (file) { return testPatterns_1.some(function (pattern) { return pattern.test(file.name); }); })];
                    case 3:
                        if (!this.packageName) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fetchPackageData()];
                    case 4:
                        _a.sent();
                        if (this.packageData && this.packageData.versions && this.packageData.versions[this.packageVersion]) {
                            testPatterns_2 = [/test/i, /spec/i, /^__tests__$/i];
                            return [2 /*return*/, Object.keys(this.packageData.versions[this.packageVersion].dist).some(function (file) { return testPatterns_2.some(function (pattern) { return pattern.test(file); }); })];
                        }
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Checks if the repository or package has linter files.
     * @returns {boolean} - true if linter files exist, false otherwise.
     * */
    correctness.prototype.checkLinters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var linterFiles_1, linterFiles_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.owner && this.repoName)) return [3 /*break*/, 3];
                        if (!!this.repoContents) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        linterFiles_1 = ['.eslintrc', '.eslintrc.js', '.eslintrc.json', '.eslintrc.yaml', '.eslintrc.yml', 'tslint.json'];
                        return [2 /*return*/, this.repoContents.some(function (file) { return linterFiles_1.includes(file.name.toLowerCase()); })];
                    case 3:
                        if (!this.packageName) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fetchPackageData()];
                    case 4:
                        _a.sent();
                        if (this.packageData && this.packageData.versions && this.packageData.versions[this.packageVersion]) {
                            linterFiles_2 = ['.eslintrc', '.eslintrc.js', '.eslintrc.json', '.eslintrc.yaml', '.eslintrc.yml', 'tslint.json'];
                            return [2 /*return*/, Object.keys(this.packageData.versions[this.packageVersion].dist).some(function (file) { return linterFiles_2.includes(file); })];
                        }
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Checks if the repository or package has dependencies defined.
     * @returns {boolean} - true if dependencies exist, false otherwise.
     * */
    correctness.prototype.checkDependencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var packageJsonFile, response, packageJson, error_2, packageJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.owner && this.repoName)) return [3 /*break*/, 8];
                        if (!!this.repoContents) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        packageJsonFile = this.repoContents.find(function (file) { return file.name.toLowerCase() === 'package.json'; });
                        if (!packageJsonFile) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, fetch(packageJsonFile.download_url, {
                                headers: {
                                    'Authorization': "token ".concat(this.githubToken)
                                }
                            })];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 5:
                        packageJson = _a.sent();
                        return [2 /*return*/, Object.keys(packageJson.dependencies || {}).length > 0];
                    case 6:
                        error_2 = _a.sent();
                        console.error('Error fetching package.json from GitHub:', error_2);
                        return [2 /*return*/, false];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        if (!this.packageName) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.fetchPackageData()];
                    case 9:
                        _a.sent();
                        if (this.packageData && this.packageData.versions && this.packageData.versions[this.packageVersion]) {
                            packageJson = this.packageData.versions[this.packageVersion];
                            return [2 /*return*/, Object.keys(packageJson.dependencies || {}).length > 0];
                        }
                        return [2 /*return*/, false];
                    case 10: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Runs all the checks and logs the results.
     * */
    correctness.prototype.runChecks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        _b = (_a = console).log;
                        _c = ['README exists:'];
                        return [4 /*yield*/, this.checkReadme()];
                    case 1:
                        _b.apply(_a, _c.concat([_r.sent()]));
                        _e = (_d = console).log;
                        _f = ['Stability (version exists):'];
                        return [4 /*yield*/, this.checkStability()];
                    case 2:
                        _e.apply(_d, _f.concat([_r.sent()]));
                        _h = (_g = console).log;
                        _j = ['Tests defined:'];
                        return [4 /*yield*/, this.checkTests()];
                    case 3:
                        _h.apply(_g, _j.concat([_r.sent()]));
                        _l = (_k = console).log;
                        _m = ['Linters defined:'];
                        return [4 /*yield*/, this.checkLinters()];
                    case 4:
                        _l.apply(_k, _m.concat([_r.sent()]));
                        _p = (_o = console).log;
                        _q = ['Dependencies defined:'];
                        return [4 /*yield*/, this.checkDependencies()];
                    case 5:
                        _p.apply(_o, _q.concat([_r.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    return correctness;
}());
exports.correctness = correctness;
/**
 * Parses the URL to extract owner, repoName, packageName and packageVersion.
 * */
function parseUrl(url) {
    var githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    var npmRegex = /npmjs\.com\/package\/([^@]+)(?:@([^\/]+))?/;
    var githubMatch = url.match(githubRegex);
    if (githubMatch) {
        return { owner: githubMatch[1], repoName: githubMatch[2] };
    }
    var npmMatch = url.match(npmRegex);
    if (npmMatch) {
        return { packageName: npmMatch[1], packageVersion: npmMatch[2] || 'latest' };
    }
    throw new Error('Invalid URL format');
}
/**
   * function to run the correctness checks.
   * */
var url = ''; // add url here
try {
    var parsedData = parseUrl(url);
    var correctnessChecker = new correctness(parsedData.owner || '', parsedData.repoName || '', parsedData.packageName || '', parsedData.packageVersion || 'latest');
    correctnessChecker.getCorrectnessScore().then(function (score) {
        console.log('Correctness Score:', score);
    }).catch(function (error) {
        console.error('Error running correctness checks:', error);
    });
}
catch (error) {
    console.error('Error parsing URL:', error);
}
