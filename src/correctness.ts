import * as dotenv from 'dotenv';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import * as fs from 'fs';
// import * as git from 'isomorphic-git';

let git: any;

(async () => {
  git = await import('isomorphic-git');
})();

dotenv.config();
// const GITHUB_API = 'https://api.github.com';

export class correctness {
  private owner: string;
  private repoName: string;
  // private githubToken: string;
  // private repoDir: string;
  private repoContents: string[];

  constructor(owner: string, repoName: string) {
    this.owner = owner;
    this.repoName = repoName;
    // this.githubToken = process.env.GITHUB_TOKEN || '';
    // this.repoDir = path.join('/tmp', this.repoName);
    // this.repoDir = '/tmp' + this.repoName;
    this.repoContents = [];
  }


  /** 
   * Calculates the correctness score of the repository or package.
   * @returns {number} - the correctness score.
   * */
  public async getCorrectnessScore(): Promise<number> {
    await this.fetchRepoContents();

    const readme = await this.checkReadme() ? 1 : 0;
    // const stability = await this.checkStability() ? 1 : 0;
    const stability = 1;
    const tests = await this.checkTests() ? 1 : 0;
    const linters = await this.checkLinters() ? 1 : 0;
    const dependencies = await this.checkDependencies() ? 1 : 0;

    // Assign weights
    const readmeWeight = 0.2;
    const stabilityWeight = 0.25;
    const testsWeight = 0.3;
    const lintersWeight = 0.1;
    const dependenciesWeight = 0.15;

    // Calculate weighted scores
    const weightedReadme = readme * readmeWeight;
    const weightedStability = stability * stabilityWeight;
    const weightedTests = tests * testsWeight;
    const weightedLinters = linters * lintersWeight;
    const weightedDependencies = dependencies * dependenciesWeight;

    // Calculate final score
    const finalScore = weightedReadme + weightedStability + weightedTests + weightedLinters + weightedDependencies;
    return finalScore;
    // return 1;
}
  

  /** 
   * Fetches the contents of the github repository using git-isomorphic.
   * */
  private async fetchRepoContents(): Promise<void> {
    try {
      // Clone the repository
      const fs = require('fs');
      const http = require('isomorphic-git/http/node');
      const dir = process.cwd() + '/tmp';
      const url = `https://github.com/${this.owner}/${this.repoName}`;
      
      await git.clone({
        fs: fs,
        http: http,
        dir: dir,
        url: url,
        depth: 1
        // onAuth: () => ({ username: this.githubToken })
      });
      console.log('Repository cloned successfully!');
      // List the files in the repository
      this.repoContents = await git.listFiles({ fs, dir: dir });
    } catch (error) {
      console.error('Error fetching repository contents:', error);
    }
  }

  /** 
   * Checks if the repository or package has a README file.
   * @returns {boolean} - true if README exists, false otherwise.
   * */
  async checkReadme(): Promise<boolean> {
    if (!this.repoContents.length) {
      await this.fetchRepoContents();
    }
    return this.repoContents.some((file: string) => file.toLowerCase() === 'readme.md');
  }

  /** 
   * Checks if the repository or package has more than one release.
   * @returns {boolean} - true if there are more than one release, false otherwise.
   * */
  async checkStability(): Promise<boolean> {
    const releasesUrl = `{https://api.github.com/}repos/${this.owner}/${this.repoName}/releases`;
    try {
      const response = await fetch(releasesUrl, {
        // headers: {
        //   Authorization: `token ${this.githubToken}`
        // }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const releases = await response.json();
      return releases.length > 1;
    } catch (error) {
      console.error('Error fetching releases:', error);
    }
    return false;
  }

  /** 
   * Checks if the repository has test files.
   * @returns {boolean} - true if test files exist, false otherwise.
   */
  private async checkTests(): Promise<boolean> {
    if (!this.repoContents) {
      await this.fetchRepoContents();
    }
    const testPatterns = [/test/i, /spec/i, /^__tests__$/i];
    return this.repoContents.some((file: any) => testPatterns.some(pattern => pattern.test(file.name)));
  }

  /** 
   * Checks if the repository or package has linter files.
   * @returns {boolean} - true if linter files exist, false otherwise.
   * */
  private async checkLinters(): Promise<boolean> {
    if (!this.repoContents.length) {
      await this.fetchRepoContents();
    }
    const linterFiles = ['.eslintrc', '.eslintrc.json', '.eslintrc.js', '.eslintignore', '.stylelintrc', '.stylelintrc.json', '.stylelintrc.js', '.stylelintignore'];
    return this.repoContents.some((file: string) => linterFiles.includes(file.toLowerCase()));
  }

  /** 
   * Checks if the repository or package has dependencies defined.
   * @returns {boolean} - true if dependencies exist, false otherwise.
   * */
  async checkDependencies(): Promise<boolean> {
    if (!this.repoContents.length) {
      await this.fetchRepoContents();
    }
    const packageJsonFile = this.repoContents.find((file: string) => file.toLowerCase() === 'package.json');
    if (!packageJsonFile) {
      return false;
    }
    try {
      // const packageJsonPath = path.join(this.repoDir, packageJsonFile);
      // const packageJsonPath = this.repoDir + packageJsonFile;
      const packageJsonPath = packageJsonFile;
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return Object.keys(packageJson.dependencies || {}).length > 0;
    } catch (error) {
      console.error('Error reading package.json:', error);
      return false;
    }
  }
      

  /** 
   * Runs all the checks and logs the results.
   * */
  async runChecks(): Promise<void> {
    console.log('README exists:', await this.checkReadme());
    console.log('Stability (version exists):', await this.checkStability());
    console.log('Tests defined:', await this.checkTests());
    console.log('Linters defined:', await this.checkLinters());
    console.log('Dependencies defined:', await this.checkDependencies());
  }
}

// Test the correctness class:
const owner = 'AidanMDB';
const repoName = 'ECE-461-Team';
const checker = new correctness(owner, repoName);
checker.getCorrectnessScore().then(score => console.log(`Correctness Score: ${score}`));