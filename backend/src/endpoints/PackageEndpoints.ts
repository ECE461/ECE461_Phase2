import { Router } from 'express';
import { PackageCommandController } from '../controllers/PackageCommandController';
import { PackageQueryController } from '../controllers/PackageQueryController'

export class PackageEndpoints {
    public router: Router;

    // Initialize router and endpoints
    constructor() {
        this.router = Router();
        this.initalizeRoutes();
    }

    // Initialize endpoints to be used in backend/src/index.ts
    private initalizeRoutes() {

        // READ-ONLY Endpoints -----------------------------------------------------------------------------------------------------------------
        // Returns all meta-data of all packages fitting query (SEARCH BY QUERY)
        this.router.post('/packages', PackageQueryController.getPackagesByQuery); // (BASELINE)

        // Return PackageMetadata of all packages that match the regex (SEARCH BY REGEX)
        this.router.post('/package/byRegEx', PackageQueryController.getPackagesByRegex) // (BASELINE)

        // Returns package information (metadata + data) for specific ID (DOWNLOAD)
        this.router.get('/package/:id', PackageQueryController.getPackageById); // (BASELINE)

        // Get ratings for package with specific ID (RATING)
        this.router.get('/package/:id/rate', PackageQueryController.getRating); // (BASELINE)

        // Given ID, return history of package for all versions (HISTORY) (extension)
        this.router.get('/package/byName/:name', PackageQueryController.getPackageHistoryByName) // (NON-BASELINE)


        // READ-WRITE Endpoints -----------------------------------------------------------------------------------------------------------------

        // Updates stored package information for specific Package ID (UPDATE)
        this.router.put('/package/:id', PackageCommandController.updatePackage) // (BASELINE)
        
        // User gives Content (base-64 encoded zipped content) or Package URL, and JSProgram (Extension)
        // Stores package as PackageMetadata + PackageData (UPLOAD/INGEST)
        this.router.post('/package', PackageCommandController.uploadPackage); // (BASELINE)

        // Reset database (RESET)
        this.router.delete('/reset', PackageCommandController.reset); // (BASELINE)

        // Deletes package with specific ID (DELETE BY ID)
        this.router.delete('/package/:id', PackageCommandController.deletePackageById); // (NON-BASELINE)

        // Given package name (DELETE ALL VERSIONS)
        this.router.delete('/package/byName/:name', PackageCommandController.deletePackageByName) // (NON-BASELINE)
        
        // Given User name, password, and isAdmin value + password, returns an AuthenticationToken (CREATE USER)
        this.router.put('/authenticate', PackageCommandController.createAccessToken); // (NON-BASELINE)
    }

    // Returns router to be used in backend/src/index.ts
    public getRouter(): Router {
        return this.router;
    }
}
