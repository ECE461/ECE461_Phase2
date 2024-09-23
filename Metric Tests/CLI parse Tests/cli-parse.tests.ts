import { CLIParser } from '../../src/cli_parse';
import { Command } from 'commander';
import axios from 'axios';
import { MetricManager } from '../../src/MetricManager';
require('dotenv').config();

jest.mock('axios');
jest.mock('../../src/MetricManager');

describe('CLI parse Tests', () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Sanitize Git URL', () => {
        const url = 'https:://github.com/owner/repo;;`<>';
        const cliParser = new CLIParser();
        const sanitizedUrl = cliParser.sanitizeGitUrl(url);
        expect(sanitizedUrl).toBe('https:://github.com/owner/repo');
    });

    test('Get Repo Link - GitHub URL', async () => {
        const url = 'https://github.com/owner/repo';
        const cliParser = new CLIParser();
        const repoLink = await cliParser.getRepoLink(url);
        expect(repoLink).toBe(url);
    });

    test('Get Repo Link - NPM URL with repository', async () => {
        const url = 'https://www.npmjs.com/package/browserify';
        const repoUrl = 'https://github.com/browserify/browserify';
        const cliParser = new CLIParser();
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                repository: {
                    url: repoUrl
                }
            }
        });
        const repoLink = await cliParser.getRepoLink(url);
        expect(repoLink).toBe(repoUrl);
    });

    test('Get Repo Link - NPM URL without repository', async () => {
        const url = 'https://www.npmjs.com/package/nonexistent-package';
        const cliParser = new CLIParser();
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {}
        });
        const repoLink = await cliParser.getRepoLink(url);
        expect(repoLink).toBeNull();
    });

    test('Get Repo Link - Invalid URL', async () => {
        const url = 'https://invalid-url.com/package';
        const cliParser = new CLIParser();
        const repoLink = await cliParser.getRepoLink(url);
        expect(repoLink).toBeNull();
    });

    test('Get Repo Link - Error fetching npm package information', async () => {
        const url = 'https://www.npmjs.com/package/browserify';
        const cliParser = new CLIParser();
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
        const repoLink = await cliParser.getRepoLink(url);
        expect(repoLink).toBeNull();
    });

    test('CLI Action - Invalid GitHub token', async () => {
        process.env.GITHUB_TOKEN = 'invalid_token';
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit: Invalid GitHub token'); });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        const cliParser = new CLIParser();
        const program = cliParser['program'];
        await expect(program.parseAsync(['node', 'cli_parse', 'https://github.com/owner/repo'])).rejects.toThrow('process.exit: Invalid GitHub token');
        expect(mockConsoleError).toHaveBeenCalledWith('Invalid GitHub token');
        mockExit.mockRestore();
        mockConsoleError.mockRestore();
    });
/*
    test('CLI Action - Valid GitHub token and valid URL', async () => {
        process.env.GITHUB_TOKEN = 'valid_token';
        (axios.get as jest.Mock).mockResolvedValueOnce({
            status: 200
        });

        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit'); });

        // Mock MetricManager methods
        const mockGetMetrics = jest.fn().mockResolvedValue({
            netScore: 0.6,
            netLatency: 0.152,
            rampUpValue: 0.5,
            rampUpLatency: 0.003,
            correctnessValue: 0.7,
            correctnessLatency: 0.109,
            busFactorValue: 0.3,
            busFactorLatency: 0.004,
            maintainerValue: 0.2,
            maintainerLatency: 0.013,
            licenseValue: 1,
            licenseLatency: 0.023
        });
        (MetricManager as jest.Mock).mockImplementation(() => {
            return {
                getMetrics: mockGetMetrics
            };
        });

        const cliParser = new CLIParser();
        const program = cliParser['program'];
        await expect(program.parseAsync(['node', 'cli_parse', 'https://github.com/owner/repo'])).rejects.toThrow('process.exit');
        expect(mockConsoleLog).toHaveBeenCalled();
        expect(mockGetMetrics).toHaveBeenCalled();
        mockConsoleLog.mockRestore();
        mockConsoleError.mockRestore();
        mockExit.mockRestore();
    });*/

});