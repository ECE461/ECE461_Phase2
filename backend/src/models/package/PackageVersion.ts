export class PackageVersion {
    private version: string;
    
    constructor(version: string) {
        this.version = version.replace(/\s+/g, '');
    }

    isValid(): boolean {
        const exactPattern = /^\d+\.\d+\.\d+$/;

        return exactPattern.test(this.version);
    }

    matches(otherVersion: PackageVersion): boolean {
        return this.version === otherVersion.getVersion() ? true : false;
    }

    getVersion(): string {
        return this.version;
    }
}