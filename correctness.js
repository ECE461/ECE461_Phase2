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
var axios_1 = require("axios");
var correctness = /** @class */ (function () {
    function correctness(projectRoot, owner, repoName) {
        this.projectRoot = projectRoot;
        this.owner = owner;
        this.repoName = repoName;
    }
    // successfully checks if README exists
    correctness.prototype.checkReadme = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.github.com/repos/".concat(this.owner, "/").concat(this.repoName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.status === 200];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // checks if any LICENSE exists in the repo
    correctness.prototype.checkLicense = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, licenseContent, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.github.com/repos/".concat(this.owner, "/").concat(this.repoName, "/contents/LICENSE");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        if (response.status === 200) {
                            licenseContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
                            return [2 /*return*/, licenseContent.includes('MIT License')];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // checks if there are multiple releases or versions of the repo
    correctness.prototype.checkStability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, releases, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.github.com/repos/".concat(this.owner, "/").concat(this.repoName, "/releases");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        if (response.status === 200) {
                            releases = response.data;
                            return [2 /*return*/, releases.length > 1];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // checks to see if there are any test files in the repo
    correctness.prototype.checkTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, files, testPatterns_1, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.github.com/repos/".concat(this.owner, "/").concat(this.repoName, "/contents");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        if (response.status === 200) {
                            files = response.data;
                            testPatterns_1 = [/test/i, /spec/i, /^__tests__$/i];
                            return [2 /*return*/, files.some(function (file) { return testPatterns_1.some(function (pattern) { return pattern.test(file.name); }); })];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // checks to see if there are any linters defined in the repo
    correctness.prototype.checkLinters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, files, linterFiles_1, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.github.com/repos/".concat(this.owner, "/").concat(this.repoName, "/contents");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        if (response.status === 200) {
                            files = response.data;
                            linterFiles_1 = [
                                '.eslintrc',
                                '.eslintrc.json',
                                '.eslintrc.js',
                                'tslint.json',
                                '.stylelintrc',
                                '.stylelintrc.json',
                                '.stylelintrc.js'
                            ];
                            return [2 /*return*/, files.some(function (file) { return linterFiles_1.includes(file.name); })];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    correctness.prototype.checkDependencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, packageJsonContent, packageJson, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.github.com/repos/".concat(this.owner, "/").concat(this.repoName, "/contents/package.json");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        if (response.status === 200) {
                            packageJsonContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
                            packageJson = JSON.parse(packageJsonContent);
                            return [2 /*return*/, Object.keys(packageJson.dependencies || {})];
                        }
                        return [2 /*return*/, []];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    correctness.prototype.runChecks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0:
                        _b = (_a = console).log;
                        _c = ['README exists:'];
                        return [4 /*yield*/, this.checkReadme()];
                    case 1:
                        _b.apply(_a, _c.concat([_u.sent()]));
                        _e = (_d = console).log;
                        _f = ['LICENSE exists:'];
                        return [4 /*yield*/, this.checkLicense()];
                    case 2:
                        _e.apply(_d, _f.concat([_u.sent()]));
                        _h = (_g = console).log;
                        _j = ['Stability (version exists):'];
                        return [4 /*yield*/, this.checkStability()];
                    case 3:
                        _h.apply(_g, _j.concat([_u.sent()]));
                        _l = (_k = console).log;
                        _m = ['Tests defined:'];
                        return [4 /*yield*/, this.checkTests()];
                    case 4:
                        _l.apply(_k, _m.concat([_u.sent()]));
                        _p = (_o = console).log;
                        _q = ['Linters defined:'];
                        return [4 /*yield*/, this.checkLinters()];
                    case 5:
                        _p.apply(_o, _q.concat([_u.sent()]));
                        _s = (_r = console).log;
                        _t = ['Dependencies:'];
                        return [4 /*yield*/, this.checkDependencies()];
                    case 6:
                        _s.apply(_r, _t.concat([_u.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    return correctness;
}());
exports.correctness = correctness;
// Testing:
// const projectPath = 'https://github.com/swethatripuramallu/Custom-Music-Tune-Timer';
// const projectPath = 'https://github.com/AidanMDB/ECE-461-Team'
var projectPath = 'https://github.com/fishaudio/fish-speech';
// const projectPath = 'https://github.com/Allar/ue5-style-guide';
//const correctnessChecker = new correctness(projectPath, 'msolinsky', 'ece30864-fall2024-lab3');
// const correctnessChecker = new correctness(projectPath, 'AidanMDB', 'ECE-461-Team');
var correctnessChecker = new correctness(projectPath, 'fishaudio', 'fish-speech');
correctnessChecker.runChecks();
