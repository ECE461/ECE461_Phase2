import { PackageMetadata } from './PackageMetadata';
import { PackageData } from './PackageData';

/* Package : Class to represent package data
 * Contains metadata and data
 */
export class Package {
    private metadata: PackageMetadata;
    private data: PackageData;

    /* Constructor
     * @param metadata: PackageMetadata - metadata of the package
     * @param data: PackageData - data of the package
     */
    constructor(metadata: PackageMetadata, data: PackageData) {
        this.metadata = metadata;
        this.data = data;
    }

    // getJson : Returns JSON representation of the package (metadata and data)
    getJson() {
        return {
            metadata: this.metadata.getJson(),
            data: this.data.getJson()
        }
    }
}