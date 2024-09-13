// takes info from API and outputs metrics

import {request, gql} from 'graphql-request';

const GITHUB_API = 'https://api.github.com/graphql';

const TOKEN = 'YOUR_GITHUB';



class MetricManager {
    private owner: string;
    private repoName: string;

    constructor(path: string) {
        let pathParts = path.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
            this.owner = pathParts[0];
            this.repoName = pathParts[1];
        } else {
            throw new Error('Invalid GitHub repository URL');
        }
    }
}
