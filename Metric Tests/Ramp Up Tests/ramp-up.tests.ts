import { AxiosError } from 'axios';
import {rampUp} from '../../src/rampUp';
require('dotenv').config();

describe('Ramp Up Tests', () => {

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

});