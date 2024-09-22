import {rampUp} from '../../src/rampUp';
require('dotenv').config();

describe('Ramp Up Tests', () => {

    test('Get Repo Stats', async () => {
        const repo = new rampUp('cloudinary', 'cloudinary_npm');
        const stats = await repo.getRepoStats();
        expect(stats).toBe(0.985);

    });

    test('Get File Count', async () => {
        const repo = new rampUp('lodash', 'lodash');
        const fileCount = await repo.getRepoStats();
        expect(fileCount).toBe(.992);

    });


});