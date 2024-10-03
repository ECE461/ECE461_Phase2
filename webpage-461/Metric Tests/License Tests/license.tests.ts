import { license } from '../../src/findLicense';
import axios from 'axios';
require('dotenv').config();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe ('License Testing', () => {

    const owner = 'OwnerName';
    const repoName = 'RepoName';
    const findAlicense = new license(owner, repoName);


    afterEach(() => {
        jest.clearAllMocks();
    });


    test('getRepoLicense should return 1 if license is found', async () => {
        const defaultBranchResponse = {
            data: { default_branch: 'main' }
        };

        (axios.get as jest.Mock).mockResolvedValueOnce(defaultBranchResponse); // Mock repo default branch
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: 'This project is licensed under the LGPL v2.1 License.'
        }); // Mock LICENSE content
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: 'Some README content.'
        }); // Mock README content

        const result = await findAlicense.getRepoLicense();
        expect(result).toBe(1);
    });


    test('getRepoLicense should return 0 if license is not found', async () => {
        const defaultBranchResponse = {
            data: { default_branch: 'main' }
        };

        (axios.get as jest.Mock).mockResolvedValueOnce(defaultBranchResponse); // Mock repo default branch
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: 'No license information here.'
        }); // Mock LICENSE content
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: 'Some README content.'
        }); // Mock README content

        const result = await findAlicense.getRepoLicense();
        expect(result).toBe(0);
    });


    test('getRepoLicense should return 0 on error', async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        const result = await findAlicense.getRepoLicense();
        expect(result).toBe(0);
    });

});