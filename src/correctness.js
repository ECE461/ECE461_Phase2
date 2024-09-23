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
var fs = require("fs");
var path = require("path");
require("es6-promise/auto");
require("isomorphic-fetch");
var dotenv = require("dotenv");
dotenv.config();
var git;
var http;
function initializeGit() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('isomorphic-git'); })];
                case 1:
                    git = _a.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('isomorphic-git/http/node'); })];
                case 2:
                    http = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var correctness = /** @class */ (function () {
    function correctness(owner, repoName) {
        this.owner = owner;
        this.repoName = repoName;
        this.repoDir = path.join('/tmp', "".concat(this.repoName, "-").concat(Date.now()));
        this.repoContents = [];
    }
    correctness.prototype.getCorrectnessScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, readme, stability, tests, linters, dependencies, readmeWeight, stabilityWeight, testsWeight, lintersWeight, dependenciesWeight, finalScore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, initializeGit()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.fetchRepoContents()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([
                                this.checkReadme().then(function (result) { return result ? 1 : 0; }),
                                this.checkStability().then(function (result) { return result ? 1 : 0; }),
                                this.checkTests().then(function (result) { return result ? 1 : 0; }),
                                this.checkLinters().then(function (result) { return result ? 1 : 0; }),
                                this.checkDependencies().then(function (result) { return result ? 1 : 0; })
                            ])];
                    case 3:
                        _a = _b.sent(), readme = _a[0], stability = _a[1], tests = _a[2], linters = _a[3], dependencies = _a[4];
                        readmeWeight = 0.2;
                        stabilityWeight = 0.25;
                        testsWeight = 0.3;
                        lintersWeight = 0.1;
                        dependenciesWeight = 0.15;
                        finalScore = (readme * readmeWeight +
                            stability * stabilityWeight +
                            tests * testsWeight +
                            linters * lintersWeight +
                            dependencies * dependenciesWeight);
                        // Clean up repository
                        return [4 /*yield*/, this.cleanup()];
                    case 4:
                        // Clean up repository
                        _b.sent();
                        return [2 /*return*/, parseFloat(finalScore.toFixed(3))];
                }
            });
        });
    };
    correctness.prototype.fetchRepoContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dir, url, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dir = this.repoDir;
                        url = "https://github.com/".concat(this.owner, "/").concat(this.repoName);
                        if (!!fs.existsSync(dir)) return [3 /*break*/, 2];
                        return [4 /*yield*/, git.clone({
                                fs: fs,
                                http: http,
                                dir: dir,
                                url: url,
                                singleBranch: true,
                                depth: 1
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, git.listFiles({ fs: fs, dir: dir })];
                    case 3:
                        _a.repoContents = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    correctness.prototype.checkReadme = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repoContents.some(function (file) { return file.toLowerCase() === 'readme.md'; })];
            });
        });
    };
    correctness.prototype.checkStability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var releasesUrl, response, releases, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        releasesUrl = "https://api.github.com/repos/".concat(this.owner, "/").concat(this.repoName, "/releases");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(releasesUrl, {
                                headers: { Authorization: "token ".concat(process.env.GITHUB_TOKEN) }
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        releases = _a.sent();
                        return [2 /*return*/, releases.length > 1];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error fetching releases:', error_1);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    correctness.prototype.checkTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var testPatterns;
            return __generator(this, function (_a) {
                testPatterns = [/test/i, /spec/i, /^__tests__$/i];
                return [2 /*return*/, this.repoContents.some(function (file) { return testPatterns.some(function (pattern) { return pattern.test(file); }); })];
            });
        });
    };
    correctness.prototype.checkLinters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var linterFiles;
            return __generator(this, function (_a) {
                linterFiles = [
                    '.eslintrc', '.eslintrc.json', '.eslintrc.js',
                    '.eslintignore', '.stylelintrc',
                    '.stylelintrc.json', '.stylelintrc.js',
                    '.stylelintignore'
                ];
                return [2 /*return*/, this.repoContents.some(function (file) { return linterFiles.includes(file.toLowerCase()); })];
            });
        });
    };
    correctness.prototype.checkDependencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var packageJsonFile, packageJsonPath, packageJson;
            return __generator(this, function (_a) {
                packageJsonFile = this.repoContents.find(function (file) { return file.toLowerCase() === 'package.json'; });
                if (!packageJsonFile) {
                    return [2 /*return*/, false];
                }
                try {
                    packageJsonPath = path.join(this.repoDir, packageJsonFile);
                    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                    return [2 /*return*/, Object.keys(packageJson.dependencies || {}).length > 0];
                }
                catch (error) {
                    console.error('Error reading package.json:', error);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    correctness.prototype.cleanup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    fs.rmSync(this.repoDir, { recursive: true });
                }
                catch (error) {
                    console.error('Error removing repository directory:', error);
                }
                return [2 /*return*/];
            });
        });
    };
    correctness.prototype.runChecks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchRepoContents()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.all([
                                this.checkReadme(),
                                this.checkStability(),
                                this.checkTests(),
                                this.checkLinters(),
                                this.checkDependencies()
                            ])];
                    case 2:
                        checks = _a.sent();
                        console.log('README exists:', checks[0]);
                        console.log('Stability (version exists):', checks[1]);
                        console.log('Tests defined:', checks[2]);
                        console.log('Linters defined:', checks[3]);
                        console.log('Dependencies defined:', checks[4]);
                        return [4 /*yield*/, this.cleanup()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return correctness;
}());
exports.correctness = correctness;
