"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
//import { URL } from 'url';
var program = new commander_1.Command();
program
    .version('0.0.1')
    .command('url <url>')
    .description('CLI program takes in URL of a package and outputs measured metrics')
    // .argument('<url>', 'URL of the package')
    .action(function (urlString) {
    try {
        // Parse the URL
        var url = urlString;
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
    }
    catch (error) {
        console.error('Invalid URL:', error.message);
        process.exit(1);
    }
});
program.parse(process.argv);
