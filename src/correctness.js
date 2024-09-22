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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var path_1 = require("path");
var fs_1 = require("fs");
var git;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('isomorphic-git'); })];
            case 1:
                git = _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
dotenv.config();
var GITHUB_API = 'https://api.github.com';
var correctness = /** @class */ (function () {
    function correctness(owner, repoName) {
        this.owner = owner;
        this.repoName = repoName;
        this.githubToken = process.env.GITHUB_TOKEN || '';
        this.repoDir = path_1.default.join('/tmp', this.repoName);
        this.repoContents = [];
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
                        return [4 /*yield*/, this.checkReadme()];
                    case 2:
                        readme = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkStability()];
                    case 3:
                        stability = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkTests()];
                    case 4:
                        tests = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkLinters()];
                    case 5:
                        linters = (_a.sent()) ? 1 : 0;
                        return [4 /*yield*/, this.checkDependencies()];
                    case 6:
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
     * Fetches the contents of the github repository using git-isomorphic.
     * */
    correctness.prototype.fetchRepoContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        // Clone the repository
                        return [4 /*yield*/, git.clone({
                                fs: fs_1.default,
                                dir: this.repoDir,
                                url: "https://github.com/".concat(this.owner, "/").concat(this.repoName),
                                onAuth: function () { return ({ username: _this.githubToken }); }
                            })];
                    case 1:
                        // Clone the repository
                        _b.sent();
                        // List the files in the repository
                        _a = this;
                        return [4 /*yield*/, git.listFiles({ fs: fs_1.default, dir: this.repoDir })];
                    case 2:
                        // List the files in the repository
                        _a.repoContents = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error('Error fetching repository contents:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
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
                        if (!!this.repoContents.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.repoContents.some(function (file) { return file.toLowerCase() === 'readme.md'; })];
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
            var releasesUrl, response, releases, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        releasesUrl = "{https://api.github.com/}repos/".concat(this.owner, "/").concat(this.repoName, "/releases");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(releasesUrl, {
                                headers: {
                                    Authorization: "token ".concat(this.githubToken)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        releases = _a.sent();
                        return [2 /*return*/, releases.length > 1];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error fetching releases:', error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Checks if the repository has test files.
     * @returns {boolean} - true if test files exist, false otherwise.
     */
    correctness.prototype.checkTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var testPatterns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.repoContents) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        testPatterns = [/test/i, /spec/i, /^__tests__$/i];
                        return [2 /*return*/, this.repoContents.some(function (file) { return testPatterns.some(function (pattern) { return pattern.test(file.name); }); })];
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
            var linterFiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.repoContents.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        linterFiles = ['.eslintrc', '.eslintrc.json', '.eslintrc.js', '.eslintignore', '.stylelintrc', '.stylelintrc.json', '.stylelintrc.js', '.stylelintignore'];
                        return [2 /*return*/, this.repoContents.some(function (file) { return linterFiles.includes(file.toLowerCase()); })];
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
            var packageJsonFile, packageJsonPath, packageJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.repoContents.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        packageJsonFile = this.repoContents.find(function (file) { return file.toLowerCase() === 'package.json'; });
                        if (!packageJsonFile) {
                            return [2 /*return*/, false];
                        }
                        try {
                            packageJsonPath = path_1.default.join(this.repoDir, packageJsonFile);
                            packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
                            return [2 /*return*/, Object.keys(packageJson.dependencies || {}).length > 0];
                        }
                        catch (error) {
                            console.error('Error reading package.json:', error);
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
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
// Test the correctness class:
var owner = 'AidanMDB';
var repoName = 'ECE-461-Team';
var checker = new correctness(owner, repoName);
checker.getCorrectnessScore().then(function (score) { return console.log("Correctness Score: ".concat(score)); });
