"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var url_1 = require("url");
var program = new commander_1.Command();
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
    .action(function (urlString) {
    try {
        // Parse the URL
        var parsedUrl = new url_1.URL(urlString);
        console.log('Pathname:', parsedUrl.pathname);
        // Extract owner and repository name
        var pathParts = parsedUrl.pathname.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
            var owner = pathParts[0], repoName = pathParts[1];
            console.log('Owner:', owner);
            console.log('Repo Name:', repoName);
        }
        else {
            throw new Error('Invalid GitHub repository URL');
        }
    }
    catch (error) {
        console.error('Invalid URL:', error.message);
        process.exit(1);
    }
});
program.parse(process.argv);
