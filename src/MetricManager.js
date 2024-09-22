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
exports.MetricManager = void 0;
// takes info from API and outputs metrics
var busFactor_1 = require("./busFactor");
var maintainer_1 = require("./maintainer");
var rampUp_1 = require("./rampUp");
var findLicense_1 = require("./findLicense");
var correctness_1 = require("./correctness");
var dotenv = require("dotenv");
var perf_hooks_1 = require("perf_hooks");
dotenv.config();
var MetricManager = /** @class */ (function () {
    /**
     * constructs a metrics manager for a GitHub repository
     *
     * @param path the path from the URL of the GitHub repository
     */
    function MetricManager(path) {
        // extracts owner and repository name from the URL
        var pathParts = path.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
            this.owner = pathParts[0];
            this.repoName = pathParts[1];
        }
        else {
            throw new Error('Invalid GitHub repository URL');
        }
    }
    /**
     * get metrics calls all the metric classes and returns the net score of the package
     *
     * @returns the net score of the package
     */
    MetricManager.prototype.getMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var NetStartTime, startTime, busFactorMetric, busFactorValue, busFactorLatency, rampUpMetric, rampUpValue, rampUpLatency, licenseMetric, licenseValue, licenseLatency, maintainerMetric, maintainerValue, maintainerLatency, correctnessMetric, correctnessValue, correctnessLatency, netScore, netLatency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        NetStartTime = perf_hooks_1.performance.now();
                        startTime = perf_hooks_1.performance.now();
                        busFactorMetric = new busFactor_1.busFactor(this.owner, this.repoName);
                        return [4 /*yield*/, busFactorMetric.calculateBusFactor()];
                    case 1:
                        busFactorValue = _a.sent();
                        busFactorLatency = (perf_hooks_1.performance.now() - startTime) / 1000;
                        startTime = perf_hooks_1.performance.now();
                        rampUpMetric = new rampUp_1.rampUp(this.owner, this.repoName);
                        return [4 /*yield*/, rampUpMetric.getRampUpScore()];
                    case 2:
                        rampUpValue = _a.sent();
                        rampUpLatency = (perf_hooks_1.performance.now() - startTime) / 1000;
                        startTime = perf_hooks_1.performance.now();
                        licenseMetric = new findLicense_1.license(this.owner, this.repoName);
                        return [4 /*yield*/, licenseMetric.getRepoLicense()];
                    case 3:
                        licenseValue = _a.sent();
                        licenseLatency = (perf_hooks_1.performance.now() - startTime) / 1000;
                        startTime = perf_hooks_1.performance.now();
                        maintainerMetric = new maintainer_1.maintainer(this.owner, this.repoName);
                        return [4 /*yield*/, maintainerMetric.getMaintainerScore()];
                    case 4:
                        maintainerValue = _a.sent();
                        maintainerLatency = (perf_hooks_1.performance.now() - startTime) / 1000;
                        startTime = perf_hooks_1.performance.now();
                        correctnessMetric = new correctness_1.correctness(this.owner, this.repoName);
                        return [4 /*yield*/, correctnessMetric.getCorrectnessScore()];
                    case 5:
                        correctnessValue = _a.sent();
                        correctnessLatency = (perf_hooks_1.performance.now() - startTime) / 1000;
                        netScore = (0.3 * busFactorValue + 0.2 * correctnessValue + 0.2 * rampUpValue + 0.3 * maintainerValue) * licenseValue;
                        netLatency = (perf_hooks_1.performance.now() - NetStartTime) / 1000;
                        //console.log(busFactorValue);
                        // parseFloat(score.toFixed(3));
                        return [2 /*return*/, "\n        busFactorValue: ".concat(parseFloat(busFactorValue.toFixed(3)), " (Latency: ").concat(busFactorLatency.toFixed(3), " s)\n        rampUpValue: ").concat(parseFloat(rampUpValue.toFixed(3)), " (Latency: ").concat(rampUpLatency.toFixed(3), " s)\n        licenseValue: ").concat(parseFloat(licenseValue.toFixed(3)), " (Latency: ").concat(licenseLatency.toFixed(3), " s)\n        maintainerValue: ").concat(parseFloat(maintainerValue.toFixed(3)), " (Latency: ").concat(maintainerLatency.toFixed(3), " s)\n        correctnessValue: ").concat(parseFloat(correctnessValue.toFixed(3)), " (Latency: ").concat(correctnessLatency.toFixed(3), " s)\n        Net Score: ").concat(parseFloat(netScore.toFixed(3)), " (Latency: ").concat(netLatency.toFixed(3), " s)\n        ")];
                }
            });
        });
    };
    /**
     * getOwnwer returns the bus factor of the package
     *
     * @returns the Owner of the package
     */
    MetricManager.prototype.getOwner = function () {
        return this.owner;
    };
    /**
     * getRepoName returns the repository name
     *
     * @returns the repository name
     */
    MetricManager.prototype.getRepoName = function () {
        return this.repoName;
    };
    return MetricManager;
}());
exports.MetricManager = MetricManager;
