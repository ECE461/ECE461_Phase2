import { sanitizeGitUrl, getRepoLink } from '../../src/cli_parse';
require('dotenv').config();

describe('CLI parse Tests', () => {

    test('Sanitize Git URL', () => {
        const url = 'https:://github.com/owner/repo;;`<>';
        const sanitizedUrl = sanitizeGitUrl(url);
        expect(sanitizedUrl).toBe('https:://github.com/owner/repo');
    });

    test('Get Repo Link', async () => {
        const url = 'https://www.npmjs.com/package/browserify';
        const repoLink = await getRepoLink(url);
        expect(repoLink).toBe('https://github.com/browserify/browserify');
    });

});