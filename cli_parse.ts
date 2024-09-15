import { Command } from 'commander';
import { URL } from 'url';
import { MetricManager } from './MetricManager';
const program = new Command();

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
  .action((urlString: string) => {  
        try {
            // Parse the URL
            const parsedUrl = new URL(urlString);
            
            // Extract owner and repository name and get metrics
            let Metrics = new MetricManager(parsedUrl.pathname);
            Metrics.getMetrics();
        } catch (error) {
            console.error('Invalid URL:', error.message);
            process.exit(1);
        }
    });

program.parse(process.argv);