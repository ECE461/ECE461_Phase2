import * as dotenv from 'dotenv';
import 'es6-promise/auto';
import 'isomorphic-fetch';

dotenv.config();
const GITHUB_API = 'https://api.github.com';
const NPM_API = 'https://registry.npmjs.org';

export class correctness {
  private owner: string;
  private repoName: string;
  private packageName: string;
  private packageVersion: string;
  private githubToken: string;
  private repoContents: any;
  private packageData: any;

  constructor(owner: string, repoName: string, packageName: string, packageVersion: string = 'latest') {
    this.owner = owner;
    this.repoName = repoName;
    this.packageName = packageName;
    this.packageVersion = packageVersion;
    this.githubToken = process.env.GITHUB_TOKEN || '';
  }

  /** 
   * Calculates the correctness score of the repository or package.
   * @returns {number} - the correctness score.
   * */
  
  public async getCorrectnessScore(): Promise<number> {
    await this.fetchRepoContents();
    await this.fetchPackageData();

    const readme = await this.checkReadme() ? 1 : 0;
    const stability = await this.checkStability() ? 1 : 0;
    const tests = await this.checkTests() ? 1 : 0;
    const linters = await this.checkLinters() ? 1 : 0;
    const dependencies = await this.checkDependencies() ? 1 : 0;

    // Assign weights
    const readmeWeight = 0.25;
    const stabilityWeight = 0.25;
    const testsWeight = 0.3;
    const lintersWeight = 0.1;
    const dependenciesWeight = 0.1;

    // Calculate weighted scores
    const weightedReadme = readme * readmeWeight;
    const weightedStability = stability * stabilityWeight;
    const weightedTests = tests * testsWeight;
    const weightedLinters = linters * lintersWeight;
    const weightedDependencies = dependencies * dependenciesWeight;

    // Calculate final score
    const finalScore = weightedReadme + weightedStability + weightedTests
    return finalScore;
}
  
  /** 
   * Fetches the contents of the github repository.
   * */
  async fetchRepoContents() {
    const response = await fetch(`${GITHUB_API}/repos/${this.owner}/${this.repoName}/contents`, {
      headers: {
        'Authorization': `token ${this.githubToken}`
      }
    });
    this.repoContents = await response.json();
  }

  /** 
   * Fetches the contents of the npm package.
   * */
  async fetchPackageData() {
    const response = await fetch(`${NPM_API}/${this.packageName}/${this.packageVersion}`);
    this.packageData = await response.json();
  }

  /** 
   * Checks if the repository or package has a README file.
   * @returns {boolean} - true if README exists, false otherwise.
   * */
  async checkReadme(): Promise<number> {
    if (this.owner && this.repoName) {
      if (!this.repoContents) {
        await this.fetchRepoContents();
      }
      return this.repoContents.some((file: any) => file.name.toLowerCase() === 'readme.md');
    } else if (this.packageName) {
      await this.fetchPackageData();
      if (this.packageData && this.packageData.readme) {
        return 1;
      } else {
        console.warn('No README found in package data');
        return 0;
      }
    }
    return 0;
  }

  /** 
   * Checks if the repository or package has more than one release.
   * @returns {boolean} - true if there are more than one release, false otherwise.
   * */
  async checkStability(): Promise<boolean> {
    if (this.owner && this.repoName) {
      const releasesUrl = `${GITHUB_API}/repos/${this.owner}/${this.repoName}/releases`;
      try {
        const response = await fetch(releasesUrl, {
          headers: {
            'Authorization': `token ${this.githubToken}`
          }
        });
        const data = await response.json();
      return data.length > 1;
    } catch (error) {
      console.error('Error fetching releases:', error);
      return false;
    }
  } else if (this.packageName) {
    await this.fetchPackageData();
    if (this.packageData && this.packageData.versions) {
      return Object.keys(this.packageData.versions).length > 1;
    }
    return false;
  }
  return false;
}

  /** 
   * Checks if the repository or package has test files.
   * @returns {boolean} - true if test files exist, false otherwise.
   * */
  async checkTests(): Promise<boolean> {
    if (this.owner && this.repoName) {
      if (!this.repoContents) {
        await this.fetchRepoContents();
      }
      const testPatterns = [/test/i, /spec/i, /^__tests__$/i];
      return this.repoContents.some((file: any) => testPatterns.some(pattern => pattern.test(file.name)));
    } else if (this.packageName) {
      await this.fetchPackageData();
      if (this.packageData && this.packageData.versions && this.packageData.versions[this.packageVersion]) {
        const testPatterns = [/test/i, /spec/i, /^__tests__$/i];
        return Object.keys(this.packageData.versions[this.packageVersion].dist).some((file: string) => testPatterns.some(pattern => pattern.test(file)));
      }
      return false;
    }
    return false;
  }

  /** 
   * Checks if the repository or package has linter files.
   * @returns {boolean} - true if linter files exist, false otherwise.
   * */
  async checkLinters(): Promise<boolean> {
    if (this.owner && this.repoName) {
      if (!this.repoContents) {
        await this.fetchRepoContents();
      }
      const linterFiles = ['.eslintrc', '.eslintrc.js', '.eslintrc.json', '.eslintrc.yaml', '.eslintrc.yml', 'tslint.json'];
      return this.repoContents.some((file: any) => linterFiles.includes(file.name.toLowerCase()));
    } else if (this.packageName) {
      await this.fetchPackageData();
      if (this.packageData && this.packageData.versions && this.packageData.versions[this.packageVersion]) {
        const linterFiles = ['.eslintrc', '.eslintrc.js', '.eslintrc.json', '.eslintrc.yaml', '.eslintrc.yml', 'tslint.json'];
        return Object.keys(this.packageData.versions[this.packageVersion].dist).some((file: string) => linterFiles.includes(file));
      }
      return false;
    }
    return false;
  }

  /** 
   * Checks if the repository or package has dependencies defined.
   * @returns {boolean} - true if dependencies exist, false otherwise.
   * */
  async checkDependencies(): Promise<boolean> {
    if (this.owner && this.repoName) {
      if (!this.repoContents) {
        await this.fetchRepoContents();
      }
      const packageJsonFile = this.repoContents.find((file: any) => file.name.toLowerCase() === 'package.json');
      if (!packageJsonFile) {
        return false;
      }
      try {
        const response = await fetch(packageJsonFile.download_url, {
          headers: {
            'Authorization': `token ${this.githubToken}`
          }
        });
        const packageJson = await response.json();
        return Object.keys(packageJson.dependencies || {}).length > 0;
      } catch (error) {
        console.error('Error fetching package.json from GitHub:', error);
        return false;
      }
    } else if (this.packageName) {
      await this.fetchPackageData();
      if (this.packageData && this.packageData.versions && this.packageData.versions[this.packageVersion]) {
        const packageJson = this.packageData.versions[this.packageVersion];
        return Object.keys(packageJson.dependencies || {}).length > 0;
      }
      return false;
    }
    return false;
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

  /** 
   * Parses the URL to extract owner, repoName, packageName and packageVersion.
   * */
  function parseUrl(url: string): { owner?: string, repoName?: string, packageName?: string, packageVersion?: string } {
  const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
  const npmRegex = /npmjs\.com\/package\/([^@]+)(?:@([^\/]+))?/;

  const githubMatch = url.match(githubRegex);
  if (githubMatch) {
    return { owner: githubMatch[1], repoName: githubMatch[2] };
  }

  const npmMatch = url.match(npmRegex);
  if (npmMatch) {
    return { packageName: npmMatch[1], packageVersion: npmMatch[2] || 'latest' };
  }

  throw new Error('Invalid URL format');
}

/** 
   * function to run the correctness checks.
   * */
const url = ''; // add url here
try {
  const parsedData = parseUrl(url);
  const correctnessChecker = new correctness(parsedData.owner || '', parsedData.repoName || '', parsedData.packageName || '', parsedData.packageVersion || 'latest');
  correctnessChecker.getCorrectnessScore().then(score => {
    console.log('Correctness Score:', score);
  }).catch(error => {
    console.error('Error running correctness checks:', error);
  });
} catch (error) {
  console.error('Error parsing URL:', error);
}