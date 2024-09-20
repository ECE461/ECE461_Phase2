import { Command } from 'commander';
import { URL } from 'url';
import { MetricManager } from './MetricManager';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const program = new Command();

// Sanitize the URL to prevent command injection
const sanitizeGitUrl = (url: string) => {
    return url.replace(/[;`<>]/g, '');
};

// Function to check if the URL is from npm or GitHub
const getRepoLink = async (url: string): Promise<string | null> => {
    const npmRegex = /^https?:\/\/(www\.)?npmjs\.com\/package\/([^\/]+)$/;
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/([^\/]+\/[^\/]+)$/;

    if (githubRegex.test(url)) {
        return url;
    } else if (npmRegex.test(url)) {
        const match = url.match(npmRegex);
        if (match) {
            const packageName = match[2];
            const npmApiUrl = `https://registry.npmjs.org/${packageName}`;
            try {
                const response = await axios.get(npmApiUrl, {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_TOKEN}`
                    }
                });
                const repoUrl = response.data.repository?.url;
                if (repoUrl) {
                    // Convert git+https URLs to https URLs
                    repoUrl.replace(/^git\+/, '');
                    if (repoUrl.endsWith('.git')) {
                        let newrepoUrl = repoUrl.slice(0, -4);
                        return newrepoUrl;
                    }
                    return repoUrl;
                } else {
                    console.error('No repository found for npm package:', packageName);
                }
            } catch (error) {
                console.error('Error fetching npm package information:', error);
            }
        }
    } else {
        console.error('Invalid URL:', url);
    }
    return null;
};

// site hostnames
/*
let hostNPM:string  = 'npm.com';
let hostGITHUB:string  = 'github.com';
*/

// program metadata
program
    .name('cli_parse')
    .description('CLI program to parse URL and output measured metrics')
    .version('0.0.1');

program
  //.command('url <url>')             // command to run i.e.  "node cli_parse.ts url <url>"
  .arguments('<url>')
  .description('CLI program takes in URL of a package and outputs measured metrics')
  .action(async (urlString: string) => {  
        try {
            // Sanitize the URL to prevent command injection
            const sanitized_urlString = sanitizeGitUrl(urlString);
            const repoLink = await getRepoLink(sanitized_urlString);
            if (!repoLink) {
                console.error('Invalid URL:', urlString);
                process.exit(1);
            }
            //console.log('\n\nRepository URL:', repoLink);
            // Parse the URL
            const parsedUrl = new URL(repoLink);
            
            // Extract owner and repository name and get metrics
            let Metrics = new MetricManager(parsedUrl.pathname);
            const metrics = await Metrics.getMetrics();
            console.log('Metrics: [', metrics, '] for', Metrics.getOwner(), '/', Metrics.getRepoName());

        } catch (error) {
            console.error('Invalid URL:', (error as Error).message);
            process.exit(1);
        }
    });

program.parse(process.argv);