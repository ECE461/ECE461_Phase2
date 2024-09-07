import { Command } from 'commander';
import { URL } from 'url';

const program = new Command();

// site hostnames
let hostNPM:string  = 'npm.com';
let hostGITHUB:string  = 'github.com';


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

            if (parsedUrl.hostname == hostNPM) {
                
            }
            else if (parsedUrl.hostname == hostGITHUB) {

            }
            /*
            console.log('URL: ', urlString);
            console.log('Protocol:', parsedUrl.protocol);
            console.log('Host:', parsedUrl.host);
            console.log('Hostname:', parsedUrl.hostname);
            console.log('Port:', parsedUrl.port);
            console.log('Pathname:', parsedUrl.pathname);
            console.log('Search:', parsedUrl.search);
            console.log('Hash:', parsedUrl.hash);
            */
            
        } catch (error) {
            console.error('Invalid URL:', error.message);
            process.exit(1);
        }
    });

program.parse(process.argv);