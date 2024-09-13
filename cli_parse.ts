import { Command } from 'commander';
import { URL } from 'url';

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
            console.log('Pathname:', parsedUrl.pathname);
            
            // Extract owner and repository name
            let pathParts = parsedUrl.pathname.split('/').filter(Boolean);
            if (pathParts.length >= 2) {
                const [owner, repoName] = pathParts;
                console.log('Owner:', owner);
                console.log('Repo Name:', repoName);
            } else {
                throw new Error('Invalid GitHub repository URL');
            }

        } catch (error) {
            console.error('Invalid URL:', error.message);
            process.exit(1);
        }
    });

program.parse(process.argv);