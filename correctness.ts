import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const GITHUB_API = 'https://raw.githubusercontent.com';

export class correctness {
  private owner: string;
  private repoName: string;
  private projectRoot: string;

  constructor(projectRoot: string, owner: string, repoName: string) {
    this.projectRoot = projectRoot;
    this.owner = owner;
    this.repoName = repoName;
  }

  /**  
   * successfully checks if README exists
   * @returns boolean
   * */ 
  async checkReadme(): Promise<boolean> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repoName}/contents/Readme.md`;
    try {
      //const response = await axios.get(`${this.projectRoot}/README.md`);
      const response = await axios.get(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  /**  
   * checks if any LICENSE exists in the repo
   * @returns boolean
   * */ 
  async checkLicense(): Promise<boolean> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repoName}/contents/LICENSE`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const licenseContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
        return licenseContent.includes('MIT License');
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /** 
   * checks if there are multiple releases or versions of the repo
   * @returns boolean
   * */ 
  async checkStability(): Promise<boolean> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repoName}/releases`;
    try {
      // const response = await axios.get(`${this.projectRoot}/package.json`);
      const response = await axios.get(url);
      if (response.status === 200) {
        const releases = response.data;
        return releases.length > 1;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * checks to see if there are any test files in the repo
   * @returns boolean
   * */ 
  async checkTests(): Promise<boolean> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repoName}/contents`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const files = response.data;
        const testPatterns = [/test/i, /spec/i, /^__tests__$/i];
        return files.some((file: any) => testPatterns.some(pattern => pattern.test(file.name)));
      }
      return false;
    } catch (error) {
      return false;
    }
  }

   /** 
    * checks to see if there are any linters defined in the repo
    * * @returns boolean
   * */ 
  async checkLinters(): Promise<boolean> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repoName}/contents`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const files = response.data;
        const linterFiles = [
          '.eslintrc',
          '.eslintrc.json',
          '.eslintrc.js',
          'tslint.json',
          '.stylelintrc',
          '.stylelintrc.json',
          '.stylelintrc.js'
        ];
        return files.some((file: any) => linterFiles.includes(file.name));
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  
  /** 
    * checks to see if there are any dependencies defined in the repo
    * * @returns boolean
   * */ 
  async checkDependencies(): Promise<string[]> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repoName}/contents/package.json`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const packageJsonContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
        const packageJson = JSON.parse(packageJsonContent);
        return Object.keys(packageJson.dependencies || {});
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  async runChecks(): Promise<void> {
    console.log('README exists:', await this.checkReadme());
    console.log('LICENSE exists:', await this.checkLicense());
    console.log('Stability (version exists):', await this.checkStability());
    console.log('Tests defined:', await this.checkTests());
    console.log('Linters defined:', await this.checkLinters());
    console.log('Dependencies:', await this.checkDependencies());
  }
}

// Testing:

// const projectPath = 'https://github.com/swethatripuramallu/Custom-Music-Tune-Timer';
const projectPath = 'https://github.com/AidanMDB/ECE-461-Team'
// const projectPath = 'https://github.com/fishaudio/fish-speech';
// const projectPath = 'https://github.com/Allar/ue5-style-guide';

//const correctnessChecker = new correctness(projectPath, 'msolinsky', 'ece30864-fall2024-lab3');
const correctnessChecker = new correctness(projectPath, 'AidanMDB', 'ECE-461-Team');
// const correctnessChecker = new correctness(projectPath, 'fishaudio', 'fish-speech');
correctnessChecker.runChecks();

