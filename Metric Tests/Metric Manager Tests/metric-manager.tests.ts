import { MetricManager } from '../../webpage-461/src/app/MetricManager';
require('dotenv').config();




jest.mock('../../src/busFactor', () => ({
    busFactor: jest.fn().mockImplementation(() => ({
      calculateBusFactor: jest.fn().mockResolvedValue(0.5)
    }))
  }));
  
  jest.mock('../../src/maintainer', () => ({
    maintainer: jest.fn().mockImplementation(() => ({
      getMaintainerScore: jest.fn().mockResolvedValue(0.8)
    }))
  }));
  
  jest.mock('../../src/rampUp', () => ({
    rampUp: jest.fn().mockImplementation(() => ({
      getRampUpScore: jest.fn().mockResolvedValue(0.992)
    }))
  }));
  
  jest.mock('../../src/findLicense', () => ({
    license: jest.fn().mockImplementation(() => ({
      getRepoLicense: jest.fn().mockResolvedValue(1)
    }))
  }));
  
  jest.mock('../../src/correctness', () => ({
    correctness: jest.fn().mockImplementation(() => ({
      getCorrectnessScore: jest.fn().mockResolvedValue(0.85)
    }))
  }));



describe('Metric Manager Tests', () => {
    test('Get Metrics for valid repository', async () => {
        const manager = new MetricManager('cloudinary/cloudinary_npm');
        const metrics = await manager.getMetrics();
        expect(metrics).toEqual({
            netScore: 0.758,
            netLatency: expect.any(Number),
            rampUpValue: 0.992,
            rampUpLatency: expect.any(Number),
            correctnessValue: 0.85,
            correctnessLatency: expect.any(Number),
            busFactorValue: 0.5,
            busFactorLatency: expect.any(Number),
            maintainerValue: 0.8,
            maintainerLatency: expect.any(Number),
            licenseValue: 1,
            licenseLatency: expect.any(Number)
        });
    });


    test('Get Metrics for different valid repository', async () => {
        const manager = new MetricManager('lodash/lodash');
        const metrics = await manager.getMetrics();
        expect(metrics).toEqual({
            netScore: 0.758,
            netLatency: expect.any(Number),
            rampUpValue: 0.992,
            rampUpLatency: expect.any(Number),
            correctnessValue: 0.85,
            correctnessLatency: expect.any(Number),
            busFactorValue: 0.5,
            busFactorLatency: expect.any(Number),
            maintainerValue: 0.8,
            maintainerLatency: expect.any(Number),
            licenseValue: 1,
            licenseLatency: expect.any(Number)
        });
    });


    test('Get Metrics for invalid repository path', async () => {
        expect(() => new MetricManager('invalidpath')).toThrow('Invalid GitHub repository URL');
    });

    test('Get Metrics for empty repository path', async () => {
        expect(() => new MetricManager('')).toThrow('Invalid GitHub repository URL');
    });

    test('get owner and repo name', async () => {
        const manager = new MetricManager('cloudinary/cloudinary_npm');
        const owner = manager.getOwner();
        const repo = manager.getRepoName();
        expect(owner).toBe('cloudinary');
        expect(repo).toBe('cloudinary_npm');
    });
    /* test('Get Metrics', async () => {
        const manager = new MetricManager('cloudinary/cloudinary_npm');
        const metrics = await manager.getMetrics();
        expect(metrics).toBe('');
    });

    test('Get different metrics', async () => {
        const manager = new MetricManager('lodash/lodash');
        const metrics = await manager.getMetrics();
        expect(metrics).toBe('Metrics: [ '+
        '\n URL:' +
        'busFactorValue: 0.5 (Latency: 0.255 s)' +
        'rampUpValue: 0.992 (Latency: 0.362 s)' +
        'licenseValue: 1 (Latency: 0.426 s)' +
        'maintainerValue: 0.8 (Latency: 0.619 s)' +
        'correctnessValue: 0.85 (Latency: 1.056 s)' +
        'Net Score: 0.758 (Latency: 2.719 s)' +
        ' ] for lodash / lodash');
    });

    test('Get empty metrics', async () => {
        try {
            const manager = new MetricManager('');
            await manager.getMetrics();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }

    }); */

});