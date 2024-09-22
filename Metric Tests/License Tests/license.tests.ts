import { license } from '../../src/findLicense';

describe ('License Testing', () => {
    test('MIT License', async () => {
        let findMIT = new license('cloudinary', 'cloudinary_npm');
        let val = await findMIT.getRepoLicense();
        expect(val).toBe(0);
    });


});