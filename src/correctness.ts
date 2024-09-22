import * as fs from 'fs';
import * as path from 'path';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

let git: any;
let http: any;

async function initializeGit() {
  git = await import('isomorphic-git');
  http = await import('isomorphic-git/http/node');
}

export class correctness {
  private owner: string;
  private repoName: string;
  private githubToken: string;
  private repoDir: string;
  private repoContents: string[];

  constructor(owner: string, repoName: string) {
    this.owner = owner;
    this.repoName = repoName;
    this.githubToken = process.env.GITHUB_TOKEN || '';
    this.repoDir = path.join('/tmp', `${this.repoName}-${Date.now()}`); // Unique repo dir
    this.repoContents = [];
  }

  /**
   * Collects and returns the correctness score of the repository
   * @returns the correctness score of the repository
   */
  public async getCorrectnessScore(): Promise<number> {
    await initializeGit();
    await this.fetchRepoContents();

    const readme = await this.checkReadme() ? 1 : 0;
    const stability = await this.checkStability() ? 1 : 0;
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
    const finalScore = 
      readme * readmeWeight + 
      stability * stabilityWeight + 
      tests * testsWeight + 
      linters * lintersWeight + 
      dependencies * dependenciesWeight;
    
    try {
      fs.rmSync(this.repoDir, { recursive: true });
      //console.log('Repository directory removed successfully.');
    } catch (error) {
      console.error('CORRECTNESS -> Error removing repository directory:', error);
    }
    //return finalScore;
    return parseFloat(finalScore.toFixed(3));
  }

  /** 
   * Fetches the contents of the repository
   */
  private async fetchRepoContents(): Promise<void> {
    try {
      const dir = this.repoDir;
      const url = `https://github.com/${this.owner}/${this.repoName}`;

      //console.log('Checking if repository exists locally...');
      if (!fs.existsSync(dir)) {
        //console.log('Cloning the repository...');
        await git.clone({
          fs,
          http,
          dir,
          url,
          singleBranch: true,
          depth: 1
        });
        //console.log('Repository cloned successfully!');
      } else {
        //console.log('Repository already exists locally.');
      }

      //console.log('Listing files in the repository...');
      this.repoContents = await git.listFiles({ fs, dir });
      //console.log('Files listed successfully:', this.repoContents);
    } catch (error) {
      console.error('CORRECTNESS -> Error fetching repository contents:', error);
    }
  }

  /**
   * 
   * @returns true if README file exists in the repository, false otherwise
   */
  async checkReadme(): Promise<boolean> {
    if (!this.repoContents.length) {
      await this.fetchRepoContents();
    }
    //console.log('Checking for README...');
    return this.repoContents.some(file => file.toLowerCase() === 'readme.md');
  }

  /**
   * 
   * @returns true if the repository has more than one version or release, false otherwise
   */
  async checkStability(): Promise<boolean> {
    const releasesUrl = `https://api.github.com/repos/${this.owner}/${this.repoName}/releases`;
    try {
      const response = await fetch(releasesUrl, {
        headers: {
          Authorization: `token ${this.githubToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const releases = await response.json();
      return releases.length > 1;
    } catch (error) {
      console.error('CORRECTNESS -> Error fetching releases:', error);
      return false;
    }
  }
  
  /**
   * 
   * @returns true if the repository has test files, false otherwise
   */
  async checkTests(): Promise<boolean> {
    if (!this.repoContents.length) {
      await this.fetchRepoContents();
    }
    const testPatterns = [/test/i, /spec/i, /^__tests__$/i];
    return this.repoContents.some(file => testPatterns.some(pattern => pattern.test(file)));
  }

  /**
   * 
   * @returns true if the repository has linter configuration files, false otherwise
   */
  private async checkLinters(): Promise<boolean> {
    if (!this.repoContents.length) {
      await this.fetchRepoContents();
    }
    const linterFiles = [
      '.eslintrc', '.eslintrc.json', '.eslintrc.js', 
      '.eslintignore', '.stylelintrc', 
      '.stylelintrc.json', '.stylelintrc.js', 
      '.stylelintignore'
    ];
    return this.repoContents.some(file => linterFiles.includes(file.toLowerCase()));
  }

  /**
   * 
   * @returns true if the repository has dependencies defined in package.json, false otherwise
   */
  async checkDependencies(): Promise<boolean> {
    if (!this.repoContents.length) {
      await this.fetchRepoContents();
    }
    const packageJsonFile = this.repoContents.find(file => file.toLowerCase() === 'package.json');
    if (!packageJsonFile) {
      //console.error('package.json not found');
      return false;
    }
    try {
      const packageJsonPath = path.join(this.repoDir, packageJsonFile);
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return Object.keys(packageJson.dependencies || {}).length > 0;
    } catch (error) {
      console.error('CORRECTNESS -> Error reading package.json:', error);
      return false;
    }
  }

  /**
   * Runs all the checks and logs the results
   */
  async runChecks(): Promise<void> {
    await this.fetchRepoContents();
    console.log('README exists:', await this.checkReadme());
    console.log('Stability (version exists):', await this.checkStability());
    console.log('Tests defined:', await this.checkTests());
    console.log('Linters defined:', await this.checkLinters());
    console.log('Dependencies defined:', await this.checkDependencies());

    // Cleanup: Remove the repository directory
    try {
      fs.rmdirSync(this.repoDir, { recursive: true });
      console.log('Repository directory removed successfully.');
    } catch (error) {
      console.error('Error removing repository directory:', error);
    }
  }
}

// // Initialize and run the checks
// initializeGit().then(() => {
//   const owner = ''; // Replace with actual owner name
//   const repoName = ''; // Replace with actual repository name
//   const checker = new correctness(owner, repoName);
//   checker.getCorrectnessScore().then(score => console.log(`Correctness Score: ${score}`));
// });
