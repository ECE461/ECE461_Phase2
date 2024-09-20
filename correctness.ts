import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const GITHUB_API = 'https://api.github.com';
const NPM_API = 'https://registry.npmjs.org';

export class Correctness {
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
    this.repoContents = null;
    this.packageData = null;
  }

  /** 
   * Fetches the contents of the github repository.
   * */
  async fetchRepoContents() {
    try {
      const response = await axios.get(`${GITHUB_API}/repos/${this.owner}/${this.repoName}/contents`, {
        headers: {
          Authorization: `token ${this.githubToken}`
        }
      });
      this.repoContents = response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository contents: ${error.response.statusText}`);
    }
  }

  /** 
   * Fetches the contents of the npm package.
   * */
  async fetchPackageData() {
    try {
      const response = await axios.get(`${NPM_API}/${this.packageName}`);
      this.packageData = response.data;
    } catch (error) {
      throw new Error(`Failed to fetch package data: ${error.response.statusText}`);
    }
  }

  /** 
   * Checks if the repository or package has a README file.
   * @returns {boolean} - true if README exists, false otherwise.
   * */
  async checkReadme(): Promise<boolean> {
    if (this.owner && this.repoName) {
      if (!this.repoContents) {
        await this.fetchRepoContents();
      }
      return this.repoContents.some((file: any) => file.name.toLowerCase() === 'readme.md');
    } else if (this.packageName) {
      await this.fetchPackageData();
      if (this.packageData && this.packageData.readme) {
        return true;
      } else {
        console.warn('No README found in package data');
        return false;
      }
    }
    return false;
  }

  /** 
   * Checks if the repository or package has more than one release.
   * @returns {boolean} - true if there are more than one release, false otherwise.
   * */
  async checkStability(): Promise<boolean> {
    if (this.owner && this.repoName) {
      const releasesUrl = `${GITHUB_API}/repos/${this.owner}/${this.repoName}/releases`;
      try {
        const response = await axios.get(releasesUrl, {
          headers: {
            'Authorization': `token ${this.githubToken}`
          }
        });
        return response.data.length > 1;
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
        const response = await axios.get(packageJsonFile.download_url, {
          headers: {
            'Authorization': `token ${this.githubToken}`
          }
        });
        const packageJson = response.data;
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
  const correctnessChecker = new Correctness(parsedData.owner || '', parsedData.repoName || '', parsedData.packageName || '', parsedData.packageVersion || 'latest');
  correctnessChecker.runChecks();
} catch (error) {
  console.error('Error parsing URL:', error);
}