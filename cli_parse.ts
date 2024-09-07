import { Command } from 'commander';
//import { URL } from 'url';

const program = new Command();

program
  .version('0.0.1')
  .command('url <url>')
  .description('CLI program takes in URL of a package and outputs measured metrics')
  // .argument('<url>', 'URL of the package')
  .action((urlString: string) => {  
        try {
            // Parse the URL
            const url = urlString;
            console.log('URL: ', urlString);
            /*
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