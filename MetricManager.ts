// takes info from API and outputs metrics

//import {request, gql} from 'graphql-request';
import { busFactor } from "./BusFactor";
import { maintainer } from "./Maintainer";
import { rampUp } from "./rampUp";
import { license } from "./findLicense";
import { correctness } from "./correctness";


const GITHUB_API = 'https://api.github.com/graphql';


export class MetricManager {
    private owner: string;
    private repoName: string;
    /**
     * constructs a metrics manager for a GitHub repository
     * 
     * @param path the path from the URL of the GitHub repository
     */
    constructor(path: string) {

        // extracts owner and repository name from the URL
        let pathParts = path.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
            this.owner = pathParts[0];
            this.repoName = pathParts[1];
        } else {
            throw new Error('Invalid GitHub repository URL');
        }
    }

    /**
     * get metrics calls all the metric classes and returns the net score of the package
     * 
     * @returns the net score of the package
     */
    async getMetrics() : Promise<string> {
        let licenseMetric = new license(this.owner, this.repoName)
        let exists = await licenseMetric.getRepoLicense();
        console.log(`The License exists: ${exists}`);
        return 'hi';
    }

    /**
     * getOwnwer returns the bus factor of the package
     * 
     * @returns the Owner of the package
     */
    getOwner() : string {
        return this.owner;
    }

    /**
     * getRepoName returns the repository name
     * 
     * @returns the repository name
     */
    getRepoName() : string {
        return this.repoName;
    }
}
