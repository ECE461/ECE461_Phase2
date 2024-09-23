import { MetricManager } from '../../src/MetricManager';
require('dotenv').config();

describe('Metric Manager Tests', () => {

    test('Get Metrics', async () => {
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

    });

});