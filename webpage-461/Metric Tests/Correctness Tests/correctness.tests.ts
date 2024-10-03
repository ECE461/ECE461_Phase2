import { correctness } from '../../src/correctness';
require('dotenv').config();

jest.setTimeout(20000); // Set timeout to 10 seconds

describe ('Correctness Score Testing', () => {

    test('Perfect Score', async () => {
        const perfectScore = new correctness('cloudinary', 'cloudinary_npm');
        const correctness_score = await perfectScore.getCorrectnessScore();
        expect(correctness_score).toBe(1);
    });

    test('No Test Cases and no Linters', async () => {
        const fishAudio = new correctness('fishaudio', 'fish-speech');
        const correctness_score = await fishAudio.getCorrectnessScore();
        expect(correctness_score).toBe(0.75);
    });

    test('Only README and dependencies', async () => {
        const find = new correctness('AidanMDB', 'ECE-461-Team');
        const val = await find.getCorrectnessScore();
        expect(val).toBe(0.65);
    });

    test('NOTHING', async () => {
        const empty = new correctness('gsaniya', 'test-Repo-461');
        const val = await empty.getCorrectnessScore();
        expect(val).toBe(0);
    });
});
