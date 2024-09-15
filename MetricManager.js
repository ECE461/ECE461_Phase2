"use strict";
// takes info from API and outputs metrics
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricManager = void 0;
var GITHUB_API = 'https://api.github.com/graphql';
var TOKEN = 'YOUR_GITHUB';
var MetricManager = /** @class */ (function () {
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
    MetricManager.prototype.getMetrics = function () {
        return 'hi';
    };
    MetricManager.prototype.getOwner = function () {
        return this.owner;
    };
    MetricManager.prototype.getRepoName = function () {
        return this.repoName;
    };
    return MetricManager;
}());
exports.MetricManager = MetricManager;
