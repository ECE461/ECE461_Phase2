import { Correctness } from '../../../src/services/metrics/Correctness';
require('dotenv').config();

jest.setTimeout(20000); // Set timeout to 10 seconds

describe ('Correctness Score Testing', () => {

    test('Perfect Score', async () => {
        const perfectScore = new Correctness('cloudinary', 'cloudinary_npm');
        const correctness_score = await perfectScore.getCorrectnessScore();
        expect(correctness_score).toBe(1);
    });

    test('No Test Cases and no Linters', async () => {
        const fishAudio = new Correctness('fishaudio', 'fish-speech');
        const correctness_score = await fishAudio.getCorrectnessScore();
        expect(correctness_score).toBe(0.75);
    });

    test('Only README and dependencies', async () => {
        const find = new Correctness('AidanMDB', 'ECE-461-Team');
        const val = await find.getCorrectnessScore();
        expect(val).toBe(0.65);
    });

    test('NOTHING', async () => {
        const empty = new Correctness('gsaniya', 'test-Repo-461');
        const val = await empty.getCorrectnessScore();
        expect(val).toBe(0);
    });
});
