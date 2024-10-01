import { busFactor } from '../../webpage-461/src/busFactor';
import axios from 'axios';
require('dotenv').config();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('busFactor', () => {
    let busFactorInstance: busFactor;

    beforeEach(() => {
        busFactorInstance = new busFactor('repoOwner', 'repoName');
    });

    describe('calculateBusFactor', () => {
        it('should return the correct bus factor score based on the number of contributors', async () => {
            const commits = [
                { commit: { author: { name: 'Alice' } } },
                { commit: { author: { name: 'Bob' } } },
                { commit: { author: { name: 'Alice' } } },
                { commit: { author: { name: 'Charlie' } } },
                { commit: { author: { name: 'David' } } },
                { commit: { author: { name: 'Eve' } } },
                { commit: { author: { name: 'Frank' } } },
                { commit: { author: { name: 'Grace' } } },
                { commit: { author: { name: 'Heidi' } } },
                { commit: { author: { name: 'Ivan' } } },
                { commit: { author: { name: 'Judy' } } },
            ]; // Mock 10 unique contributors
            mockedAxios.get.mockResolvedValue({ data: commits });

            const result = await busFactorInstance.calculateBusFactor();
            expect(result).toBe(1); // Expecting bus factor score of 1 for 10 contributors
        });

        it('should return 0 and exit process if there is an error fetching commits', async () => {
            const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('process.exit: mock') });
            mockedAxios.get.mockRejectedValue(new Error('Network Error'));

            await expect(busFactorInstance.calculateBusFactor()).rejects.toThrow('process.exit: mock');
            expect(exitSpy).toHaveBeenCalledWith(1);
        });
    });

    describe('calculateBusFactorScore', () => {
        it('should return 1 for 10 or more contributors', () => {
            const result = busFactorInstance['calculateBusFactorScore'](10);
            expect(result).toBe(1);
        });

        it('should return 0.5 for 5 to 9 contributors', () => {
            const result = busFactorInstance['calculateBusFactorScore'](5);
            expect(result).toBe(0.5);
        });

        it('should return 0.3 for 2 to 4 contributors', () => {
            const result = busFactorInstance['calculateBusFactorScore'](3);
            expect(result).toBe(0.3);
        });

        it('should return 0.1 for 1 contributor', () => {
            const result = busFactorInstance['calculateBusFactorScore'](1);
            expect(result).toBe(0.1);
        });

        it('should return 0 for 0 contributors', () => {
            const result = busFactorInstance['calculateBusFactorScore'](0);
            expect(result).toBe(0);
        });
    });
});