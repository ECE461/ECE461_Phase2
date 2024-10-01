import { maintainer } from '../../webpage-461/src/maintainer';
import axios from 'axios';
require('dotenv').config();

jest.mock('axios');

describe('Maintainer Test 1', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Get Maintainer Score for valid repository', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: [{ commit: { author: { date: '2023-01-01T00:00:00Z' } } }]
        }).mockResolvedValueOnce({
            data: { open_issues_count: 10 }
        }).mockResolvedValueOnce({
            data: [{ number: 490 }]
        });

        const test = new maintainer('hasansultan92', 'watch.js');
        const score = await test.getMaintainerScore();
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
    });

    test('Get Maintainer Score for different valid repository', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: [{ commit: { author: { date: '2023-01-01T00:00:00Z' } } }]
        }).mockResolvedValueOnce({
            data: { open_issues_count: 20 }
        }).mockResolvedValueOnce({
            data: [{ number: 980 }]
        });

        const test = new maintainer('mrdoob', 'three.js');
        const score = await test.getMaintainerScore();
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
    });

    test('Get Maintainer Score for repository with no issues', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: [{ commit: { author: { date: '2023-01-01T00:00:00Z' } } }]
        }).mockResolvedValueOnce({
            data: { open_issues_count: 0 }
        }).mockResolvedValueOnce({
            data: []
        });

        const test = new maintainer('prathameshnetake', 'libvlc');
        const score = await test.getMaintainerScore();
        expect(score).toBe(0);
    });

    test('Get Maintainer Score for repository with undefined closed issues', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: [{ commit: { author: { date: '2023-01-01T00:00:00Z' } } }]
        }).mockResolvedValueOnce({
            data: { open_issues_count: 10 }
        }).mockResolvedValueOnce({
            data: [undefined]
        });

        const test = new maintainer('socketio', 'socket.io');
        const score = await test.getMaintainerScore();
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
    });


    test('Get Maintainer Score for repository with error in getLastCommit', async () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Error when fetching last commit data'));

        const test = new maintainer('invalid', 'repo');
        await expect(test.getMaintainerScore()).rejects.toThrow('Error when fetching last commit data');
    });

    test('Get Maintainer Score for repository with error in getOpenIssueRatioCount', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: [{ commit: { author: { date: '2023-01-01T00:00:00Z' } } }]
        }).mockRejectedValueOnce(new Error('Error when fetching open issue ratio count'));

        const test = new maintainer('invalid', 'repo');
        await expect(test.getMaintainerScore()).rejects.toThrow('Error when fetching open issue ratio count');
    });

    test('Get Maintainer Score for empty repository path', async () => {
        const test = new maintainer('', '');
        await expect(test.getMaintainerScore()).rejects.toThrow('Error when fetching last commit data');
    });
});
