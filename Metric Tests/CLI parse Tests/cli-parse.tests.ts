import { sanitizeGitUrl, getRepoLink, checkGitHubToken } from '../../src/cli_parse';
import { Command } from 'commander';
import axios from 'axios';
require('dotenv').config();

jest.mock('axios');

describe('CLI parse Tests', () => {

    test('Sanitize Git URL', () => {
        const url = 'https:://github.com/owner/repo;;`<>';
        const sanitizedUrl = sanitizeGitUrl(url);
        expect(sanitizedUrl).toBe('https:://github.com/owner/repo');
    });

    test('Get Repo Link - GitHub URL', async () => {
        const url = 'https://github.com/owner/repo';
        const repoLink = await getRepoLink(url);
        expect(repoLink).toBe(url);
    });

    test('Get Repo Link - NPM URL with repository', async () => {
        const url = 'https://www.npmjs.com/package/browserify';
        const repoUrl = 'https://github.com/browserify/browserify';
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                repository: {
                    url: repoUrl
                }
            }
        });
        const repoLink = await getRepoLink(url);
        expect(repoLink).toBe(repoUrl);
    });

    test('Get Repo Link - NPM URL without repository', async () => {
        const url = 'https://www.npmjs.com/package/nonexistent-package';
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {}
        });
        const repoLink = await getRepoLink(url);
        expect(repoLink).toBeNull();
    });

    test('Get Repo Link - Invalid URL', async () => {
        const url = 'https://invalid-url.com/package';
        const repoLink = await getRepoLink(url);
        expect(repoLink).toBeNull();
    });

    test('Get Repo Link - Error fetching npm package information', async () => {
        const url = 'https://www.npmjs.com/package/browserify';
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
        const repoLink = await getRepoLink(url);
        expect(repoLink).toBeNull();
    });

    test('CLI Action - Invalid GitHub token', async () => {
        process.env.GITHUB_TOKEN = 'invalid_token';
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit: Invalid GitHub token'); });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        const program = new Command();
        program
            .arguments('<url>')
            .action(async (urlString: string) => {
                const isTokenValid = await checkGitHubToken(process.env.GITHUB_TOKEN);
                if (!isTokenValid) {
                    console.error('Invalid GitHub token');
                    process.exit(1);
                }
            });

        await expect(program.parseAsync(['node', 'cli_parse', 'https://github.com/owner/repo'])).rejects.toThrow('process.exit: Invalid GitHub token');
        expect(mockConsoleError).toHaveBeenCalledWith('Invalid GitHub token');
        mockExit.mockRestore();
        mockConsoleError.mockRestore();
    });

});