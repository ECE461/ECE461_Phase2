import { maintainer } from '../../src/maintainer';

describe('Maintainer Test 1', () => {
    it('should return a number', async () => {
        const test: any = new maintainer('hasansultan92', 'watch.js');
        const score: number = await test.getMaintainerScore();
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
    });
});

describe('Maintainer Test 2', () => {
    it('should return a number', async () => {
        const test: any = new maintainer('mrdoob', 'three.js');
        const score: number = await test.getMaintainerScore();
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
    });
});

describe('Maintainer Test 3', () => {
    it('should return a number', async () => {
        const test: any = new maintainer('socketio', 'socket.io');
        const score: number = await test.getMaintainerScore();
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
    });
});

describe('Maintainer Test 4', () => {
    it('should return a number', async () => {
        const test: any = new maintainer('prathameshnetake', 'libvlc');
        const score: number = await test.getMaintainerScore();
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
    });
});