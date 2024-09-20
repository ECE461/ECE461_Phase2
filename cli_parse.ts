import { Command } from 'commander';
import { URL } from 'url';
import { MetricManager } from './MetricManager';
import * as dotenv from 'dotenv';
dotenv.config();

const program = new Command();

// Sanitize the URL to prevent command injection
const sanitizeGitUrl = (url: string) => {
    return url.replace(/[;`<>]/g, '');
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

            // Parse the URL
            const parsedUrl = new URL(sanitized_urlString);
            
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