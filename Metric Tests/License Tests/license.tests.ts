import { license } from '../../src/findLicense';
require('dotenv').config();

describe ('License Testing', () => {
    test('MIT License', async () => {
        let findMIT = new license('cloudinary', 'cloudinary_npm');
        let val = await findMIT.getRepoLicense();
        expect(val).toBe(1);
    });

    test('MIT License', async () => {
        let find = new license('lodash', 'lodash');
        let val = await find.getRepoLicense();
        expect(val).toBe(1);
    });

    test('No License/license file', async () => {
        let find = new license('AidanMDB', 'ECE-461-Team');
        let val = await find.getRepoLicense();
        expect(val).toBe(0);
    });

    test('No ReadME or License', async () => {
        let find = new license('AidanMDB', 'Solar-Tracker-Code');
        let val = await find.getRepoLicense();
        expect(val).toBe(0);
    });

/*     test('', async () => {
        let find = new license('', '');
        let val = await find.getRepoLicense();
        expect(val).toBe(1);
    }); */
});