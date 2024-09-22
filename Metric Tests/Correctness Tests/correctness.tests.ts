// import { correctness } from '../../src/correctness';

// describe('Correctness Test 1', () => {
//         it('should return a number', async () => {
//             const test = new correctness('hasansultan92', 'watch.js', 'dummyToken');
//             const score: number = await test.getCorrectnessScore();
//             expect(score).toBeGreaterThanOrEqual(0);
//             expect(score).toBeLessThanOrEqual(1);
//         });
//     });
// describe('Correctness Tests', () => {
//   let correctness: correctness;

// //   beforeEach(() => {
// //     correctness_test = new correctness('hasansultan92', 'watch.js', 'dummyToken');
// //   });

//   it('all tests will fail', async () => {
//     jest.spyOn(correctness, 'checkReadme').mockResolvedValue(0);
//     jest.spyOn(correctness, 'checkStability').mockResolvedValue(false);
//     jest.spyOn(correctness, 'checkTests').mockResolvedValue(false);
//     jest.spyOn(correctness, 'checkLinters').mockResolvedValue(false);
//     jest.spyOn(correctness, 'checkDependencies').mockResolvedValue(false);

//     const score = await correctness.getCorrectnessScore();
//     const expectedScore = 0 * 0.25 + 0 * 0.25 + 0 * 0.3 + 0 * 0.1 + 0 * 0.1;
//     expect(score).toBe(expectedScore);
//   });

//   it('should pass all tests', async () => {
//     jest.spyOn(correctness, 'checkReadme').mockResolvedValue(1);
//     jest.spyOn(correctness, 'checkStability').mockResolvedValue(true);
//     jest.spyOn(correctness, 'checkTests').mockResolvedValue(true);
//     jest.spyOn(correctness, 'checkLinters').mockResolvedValue(true);
//     jest.spyOn(correctness, 'checkDependencies').mockResolvedValue(true);

//     const score = await correctness.getCorrectnessScore();
//     const expectedScore = 1 * 0.25 + 1 * 0.25 + 1 * 0.3 + 1 * 0.1 + 1 * 0.1;
//     expect(score).toBe(expectedScore);
//   });

// //   it('mixed results, some will pass, some fail', async () => {
// //     jest.spyOn(correctness, 'checkReadme').mockResolvedValue(0.8);
// //     jest.spyOn(correctness, 'checkStability').mockResolvedValue(0.6);
// //     jest.spyOn(correctness, 'checkTests').mockResolvedValue(0.9);
// //     jest.spyOn(correctness, 'checkLinters').mockResolvedValue(0.7);
// //     jest.spyOn(correctness, 'checkDependencies').mockResolvedValue(0.5);

// //     const score = await correctness.getCorrectnessScore();
// //     const expectedScore = 0.8 * 0.25 + 0.6 * 0.25 + 0.9 * 0.3 + 0.7 * 0.1 + 0.5 * 0.1;
// //     expect(score).toBeCloseTo(expectedScore, 5);
// //   });
// });