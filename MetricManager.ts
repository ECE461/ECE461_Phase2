// takes info from API and outputs metrics

//import {request, gql} from 'graphql-request';
import { busFactor } from "./busFactor";
import { maintainer } from "./maintainer";
import { rampUp } from "./rampUp";
import { license } from "./license";
import { correctness } from "./correctness";
import * as dotenv from 'dotenv';
dotenv.config();

const GITHUB_API = 'https://api.github.com/graphql';

//const TOKEN = 'YOUR_GITHUB';
const TOKEN = process.env.GITHUB_TOKEN;


export class MetricManager {
    private owner: string;
    private repoName: string;

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

    async getMetrics() : Promise<string> {
        // get the bus factor
        let busFactorMetric = new busFactor(this.owner, this.repoName);
        let busFactorValue = await busFactorMetric.calculateBusFactor();
        //console.log(busFactorValue);
        return 'Contributors: ' + busFactorValue;
    }


    getOwner() : string {
        return this.owner;
    }

    getRepoName() : string {
        return this.repoName;
    }
}

