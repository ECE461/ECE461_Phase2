import { AxiosError } from 'axios';
import axios from 'axios';
import {rampUp} from '../../src/rampUp';
require('dotenv').config();

jest.mock('axios');


describe('Ramp Up Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Get Repo Stats', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                size: 5000000,
                stargazers_count: 500,
                forks_count: 100
            }
        }).mockResolvedValueOnce({
            data: [
                { type: 'file' },
                { type: 'file' }
            ]
        }).mockResolvedValueOnce({
            data: {
                content: Buffer.from(JSON.stringify({
                    dependencies: {
                        "axios": "^0.21.1"
                    }
                })).toString('base64')
            }
        });
        
        const repo = new rampUp('cloudinary', 'cloudinary_npm');
        const stats = await repo.getRampUpScore();
        expect(stats).toBe(0.829);
    });


    test('Get different repo stats', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: {
                size: 3000000,
                stargazers_count: 1000,
                forks_count: 200
            }
        }).mockResolvedValueOnce({
            data: [
                { type: 'file' },
                { type: 'file' },
                { type: 'file' }
            ]
        }).mockResolvedValueOnce({
            data: {
                content: Buffer.from(JSON.stringify({
                    dependencies: {
                        "lodash": "^4.17.21"
                    }
                })).toString('base64')
            }
        });

        const repo = new rampUp('lodash', 'lodash');
        const stats = await repo.getRampUpScore();
        expect(stats).toBe(0.896);
    });



    test('Get empty repo', async () => {
        try {
            const repo = new rampUp('', '');
            await repo.getRampUpScore();
        } catch (error) {
            expect(error).toBeInstanceOf(AxiosError);
        }
    });
/* 
    test('Get Repo Stats', async () => {
        const repo = new rampUp('cloudinary', 'cloudinary_npm');
        const stats = await repo.getRampUpScore();
        expect(stats).toBe(0.985);

    });

    test('Get different repo stats', async () => {
        const repo = new rampUp('lodash', 'lodash');
        const fileCount = await repo.getRampUpScore();
        expect(fileCount).toBe(.992);

    });

    test('Get empty repo', async () => {
        try {
            const repo = new rampUp('', '');
            await repo.getRampUpScore();
        } catch (error) {
            expect(error).toBeInstanceOf(AxiosError);
        }

    });
 */
});