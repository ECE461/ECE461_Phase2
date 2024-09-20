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
exports.license = void 0;
var axios_1 = require("axios");
var GITHUB_API = 'https://raw.githubusercontent.com';
var license = /** @class */ (function () {
    /**
     * constructs a metrics manager for a GitHub repository
     *
     * @param owner the owner of the repository
     * @param repoName the name of the repository
     */
    function license(owner, repoName) {
        this.owner = owner;
        this.repoName = repoName;
    }
    /**
     * getFileContent returns a boolean if the file contains LGPLv2.1
     *
     * @returns a boolean if the LGPLv2.1 is in the file, null if there is an error
     */
    license.prototype.getFileContent = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = "".concat(GITHUB_API, "/").concat(this.owner, "/").concat(this.repoName, "/main/").concat(path);
                        return [4 /*yield*/, axios_1.default.get(url, {
                                headers: {
                                    'Authorization': "token ".concat(process.env.GITHUB_TOKEN)
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.includes('LGPLv2.1')];
                    case 2:
                        error_1 = _a.sent();
                        //console.error(`Error when fetching file content in ${this.owner}/${this.repoName}  ${path}: ${error}`);
                        //console.log(path);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getRepoLicense returns the license of the package
     *
     * @returns 1 if the license is LGPLv2.1, 0 otherwise
     */
    license.prototype.getRepoLicense = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, licenseFile, readMeFile, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                this.getFileContent('LICENSE'),
                                this.getFileContent('README.md')
                            ])];
                    case 1:
                        _a = _b.sent(), licenseFile = _a[0], readMeFile = _a[1];
                        // checks if one or the other contains LGPLv2.1
                        if (licenseFile || readMeFile) {
                            //console.log('License Found: LGPLv2.1');
                            return [2 /*return*/, 1];
                        }
                        //console.log('License Not Found');
                        return [2 /*return*/, 0];
                    case 2:
                        error_2 = _b.sent();
                        console.error("Error when fetching license in ".concat(this.owner, "/").concat(this.repoName, ": ").concat(error_2));
                        return [2 /*return*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return license;
}());
exports.license = license;
