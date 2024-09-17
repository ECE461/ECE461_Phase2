import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const GITHUB_API = 'https://raw.githubusercontent.com';

export class correctness {
  private owner: string;
  private repoName: string;
  private githubToken: string;
  private repoContents: any;

  constructor(owner: string, repoName: string) {
    this.owner = owner;
    this.repoName = repoName;
    this.githubToken = process.env.GITHUB_TOKEN || '';
    this.repoContents = null;
  }

  /**
   * Fetches the repository contents from the GitHub API
   * stores them in the `repoContents` property
   */

  async fetchRepoContents(): Promise<void> {
    const url = `${GITHUB_API}/repos/${this.owner}/${this.repoName}/contents`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `token ${this.githubToken}`
        }
      });
      this.repoContents = response.data;
    } catch (error) {
      console.error('Error fetching repository contents:', error);
    }
  }

  /**  
   * successfully checks if README exists
   * @returns {Promise<boolean>} - true if README exists, false otherwise
   * */ 
  async checkReadme(): Promise<boolean> {
    if (!this.repoContents) {
      await this.fetchRepoContents();
    }
    return this.repoContents.some((file: any) => file.name.toLowerCase() === 'readme.md');
  }

  /** 
   * checks if there are multiple releases or versions of the repo
   * @returns {Promise<boolean>} - true if there are multiple releases, false otherwise
   * */ 
  async checkStability(): Promise<boolean> {
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
  }

  /**
   * checks to see if there are any test files in the repo
   * @returns {Promise<boolean>} - true if there are test files, false otherwise
   * */ 
  async checkTests(): Promise<boolean> {
    if (!this.repoContents) {
      await this.fetchRepoContents();
    }
    const testPatterns = [/test/i, /spec/i, /^__tests__$/i];
    return this.repoContents.some((file: any) => testPatterns.some(pattern => pattern.test(file.name)));
  }

   /** 
    * checks to see if there are any linters defined in the repo
    * * @returns {Promise<boolean>} - true if there are linters, false otherwise
   * */ 
   async checkLinters(): Promise<boolean> {
    if (!this.repoContents) {
      await this.fetchRepoContents();
    }
    const linterFiles = ['.eslintrc', '.eslintrc.js', '.eslintrc.json', '.eslintrc.yaml', '.eslintrc.yml', 'tslint.json'];
    return this.repoContents.some((file: any) => linterFiles.includes(file.name.toLowerCase()));
  }

  
  /** 
    * checks to see if there are any dependencies defined in the repo
    * * @returns {Promise<string[]>} - list of dependencies
   * */ 
  async checkDependencies(): Promise<boolean> {
    if (!this.repoContents) {
      await this.fetchRepoContents();
    }
    const packageJsonFile = this.repoContents.find((file: any) => file.name.toLowerCase() === 'package.json');
    if (!packageJsonFile) {
      return false;
    }
    const url = packageJsonFile.download_url;
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `token ${this.githubToken}`
        }
      });
      if (response.status === 200) {
        const packageJsonContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
        const packageJson = JSON.parse(packageJsonContent);
        return Object.keys(packageJson.dependencies || {}).length > 0;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async runChecks(): Promise<void> {
    console.log('README exists:', await this.checkReadme());
    console.log('Stability (version exists):', await this.checkStability());
    console.log('Tests defined:', await this.checkTests());
    console.log('Linters defined:', await this.checkLinters());
    console.log('Dependencies defined:', await this.checkDependencies());
  }
}

// Testing:

// const projectPath = 'https://github.com/swethatripuramallu/Custom-Music-Tune-Timer';
// const projectPath = 'https://github.com/AidanMDB/ECE-461-Team'
// const projectPath = 'https://github.com/fishaudio/fish-speech';
// const projectPath = 'https://github.com/Allar/ue5-style-guide';

//const correctnessChecker = new correctness(projectPath, 'msolinsky', 'ece30864-fall2024-lab3');
const correctnessChecker = new correctness('fishaudio', 'fish-speech');
// const correctnessChecker = new correctness(projectPath, 'fishaudio', 'fish-speech');
correctnessChecker.runChecks();

