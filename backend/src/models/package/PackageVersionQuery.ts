import { PackageVersion } from "./PackageVersion";
import semver from 'semver';

export class PackageVersionQuery {
    private versionQuery: string;
    
    constructor(versionQuery: string) {
        // Set version query with no spaces
        this.versionQuery = versionQuery.replace(/\s/g, '');;
    }

    isValid(): boolean {
        const exactPattern = /^\d+\.\d+\.\d+$/;
        const rangePattern = /^\d+\.\d+\.\d+-\d+\.\d+\.\d+$/;
        const caratPattern = /^\^\d+\.\d+\.\d+$/;
        const tildePattern = /^~\d+\.\d+\.\d+$/;

        return exactPattern.test(this.versionQuery) || 
               rangePattern.test(this.versionQuery) || 
               caratPattern.test(this.versionQuery) || 
               tildePattern.test(this.versionQuery);
    }

    getVersionQueryType(): string {
        // Should have checked validity somewhere before calling this function
        if (this.versionQuery.startsWith("^")) return "Carat";
        if (this.versionQuery.startsWith("~")) return "Tilde";
        if (this.versionQuery.includes("-")) return "Range";
        return "Exact";
    }

    matches(version: string): boolean {
        return semver.satisfies(version, this.versionQuery);
    }

    getVersionQuery(): string {
        return this.versionQuery;
    }

    getPackageVersionQuery(): string {
        return this.versionQuery;
    }
}