import { PackageName } from "./PackageName";
import { PackageVersion } from "./PackageVersion";
import { PackageID } from "./PackageID";

export interface IPackageMetadata {
    Name: string;
    Version: string;
    ID: string;
}

/* PackageMetadata: Class to represent package metadata
 * Contains: name, version, and id
 */
export class PackageMetadata{
    private name: PackageName; // ex: "package-name"
    private version: PackageVersion; // ex: "1.0.0"
    private id: PackageID; // ex: "123456789"

    /* Constructor
     * @param name: string - name of the package
     * @param version: string - version of the package
     */
    constructor (name: string, version: string) {
        this.name = new PackageName(name);
        this.version = new PackageVersion(version);
        this.id = new PackageID(name, version);
    }

    // getName : Returns name of the package
    getName(): string {
        return this.name.getName();
    }

    // getVersion : Returns version of the package
    getVersion(): string {
        return this.version.getVersion();
    }

    // getId : Returns ID of the package
    getId(): string {
        return this.id.getId();
    }

    // getJson : Returns JSON representation of the package metadata
    getJson() {
        return {
            Name: this.name.getName(),
            Version: this.version.getVersion(),
            ID: this.id.getId()
        }
    }
}