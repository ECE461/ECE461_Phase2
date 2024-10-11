import crypto from 'crypto';

export class PackageID {
    private id: string;
    constructor(packageName: string, packageVersion: string) {
        // Create unique identifier number from combination of package name and version
        const data = packageName + packageVersion;

        this.id = crypto.createHash('sha256').update(data).digest('hex');
    }

    getId(): string {
        return this.id;
    }
}