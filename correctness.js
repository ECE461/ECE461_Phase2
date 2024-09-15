"use strict";
// export class correctness {
//     private projectRoot: string;
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
exports.Correctness = void 0;
//     constructor(projectRoot: string) {
//         this.projectRoot = projectRoot;
//     }
//     checkReadme(): boolean {
//         return fs.existsSync(path.join(this.projectRoot, 'README.md'));
//     }
//     checkLicense(): boolean {
//         return fs.existsSync(path.join(this.projectRoot, 'LICENSE'));
//     }
//     checkStability(): boolean {
//         const packageJsonPath = path.join(this.projectRoot, 'package.json');
//         if (fs.existsSync(packageJsonPath)) {
//             const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
//             return !!packageJson.version;
//         }
//         return false;
//     }
//     checkTests(): boolean {
//         const packageJsonPath = path.join(this.projectRoot, 'package.json');
//         if (fs.existsSync(packageJsonPath)) {
//             const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
//             return !!packageJson.scripts && !!packageJson.scripts.test;
//         }
//         return false;
//     }
//     checkLinters(): boolean {
//         return fs.existsSync(path.join(this.projectRoot, '.eslintrc')) || fs.existsSync(path.join(this.projectRoot, 'tslint.json'));
//     }
//     checkDependencies(): string[] {
//         const packageJsonPath = path.join(this.projectRoot, 'package.json');
//         if (fs.existsSync(packageJsonPath)) {
//             const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
//             return Object.keys(packageJson.dependencies || {});
//         }
//         return [];
//     }
//     runChecks(): void {
//         console.log('README exists:', this.checkReadme());
//         console.log('LICENSE exists:', this.checkLicense());
//         console.log('Stability (version exists):', this.checkStability());
//         console.log('Tests defined:', this.checkTests());
//         console.log('Linters defined:', this.checkLinters());
//         console.log('Dependencies:', this.checkDependencies());
//     }
// }
// const correctnessChecker = new correctness('path/to/project');
// correctnessChecker.runChecks();
var axios_1 = require("axios");
var Correctness = /** @class */ (function () {
    function Correctness(projectRoot) {
        this.projectRoot = projectRoot;
    }
    Correctness.prototype.checkReadme = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.projectRoot, "/README.md"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.status === 200];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Correctness.prototype.checkLicense = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.projectRoot, "/LICENSE"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.status === 200];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Correctness.prototype.checkStability = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, packageJson, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.projectRoot, "/package.json"))];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            packageJson = response.data;
                            return [2 /*return*/, !!packageJson.version];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Correctness.prototype.checkTests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, packageJson, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.projectRoot, "/package.json"))];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            packageJson = response.data;
                            return [2 /*return*/, !!packageJson.scripts && !!packageJson.scripts.test];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Correctness.prototype.checkLinters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eslintResponse, tslintResponse, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.projectRoot, "/.eslintrc"))];
                    case 1:
                        eslintResponse = _a.sent();
                        return [4 /*yield*/, axios_1.default.get("".concat(this.projectRoot, "/tslint.json"))];
                    case 2:
                        tslintResponse = _a.sent();
                        return [2 /*return*/, eslintResponse.status === 200 || tslintResponse.status === 200];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Correctness.prototype.checkDependencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, packageJson, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.projectRoot, "/package.json"))];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            packageJson = response.data;
                            return [2 /*return*/, Object.keys(packageJson.dependencies || {})];
                        }
                        return [2 /*return*/, []];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Correctness.prototype.runChecks = function () {
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
    return Correctness;
}());
exports.Correctness = Correctness;
// Example usage:
var projectPath = 'https://api.github.com/graphql';
var correctnessChecker = new Correctness(projectPath);
correctnessChecker.runChecks();
