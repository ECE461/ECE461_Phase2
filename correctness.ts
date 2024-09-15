// export class correctness {
//     private projectRoot: string;

//     constructor(projectRoot: string) {
//         this.projectRoot = projectRoot;
//     }

//     checkReadme(): boolean {
//         return fs.existsSync(path.join(this.projectRoot, 'README.md'));
//     }

//     checkLicense(): boolean {
//         return fs.existsSync(path.join(this.projectRoot, 'LICENSE'));
//     }

//     checkStability(): boolean {
//         const packageJsonPath = path.join(this.projectRoot, 'package.json');
//         if (fs.existsSync(packageJsonPath)) {
//             const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
//             return !!packageJson.version;
//         }
//         return false;
//     }

//     checkTests(): boolean {
//         const packageJsonPath = path.join(this.projectRoot, 'package.json');
//         if (fs.existsSync(packageJsonPath)) {
//             const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
//             return !!packageJson.scripts && !!packageJson.scripts.test;
//         }
//         return false;
//     }

//     checkLinters(): boolean {
//         return fs.existsSync(path.join(this.projectRoot, '.eslintrc')) || fs.existsSync(path.join(this.projectRoot, 'tslint.json'));
//     }

//     checkDependencies(): string[] {
//         const packageJsonPath = path.join(this.projectRoot, 'package.json');
//         if (fs.existsSync(packageJsonPath)) {
//             const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
//             return Object.keys(packageJson.dependencies || {});
//         }
//         return [];
//     }

//     runChecks(): void {
//         console.log('README exists:', this.checkReadme());
//         console.log('LICENSE exists:', this.checkLicense());
//         console.log('Stability (version exists):', this.checkStability());
//         console.log('Tests defined:', this.checkTests());
//         console.log('Linters defined:', this.checkLinters());
//         console.log('Dependencies:', this.checkDependencies());
//     }
// }

// const correctnessChecker = new correctness('path/to/project');
// correctnessChecker.runChecks();


import axios from 'axios';

export class Correctness {
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  async checkReadme(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.projectRoot}/README.md`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async checkLicense(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.projectRoot}/LICENSE`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async checkStability(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.projectRoot}/package.json`);
      if (response.status === 200) {
        const packageJson = response.data;
        return !!packageJson.version;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async checkTests(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.projectRoot}/package.json`);
      if (response.status === 200) {
        const packageJson = response.data;
        return !!packageJson.scripts && !!packageJson.scripts.test;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async checkLinters(): Promise<boolean> {
    try {
      const eslintResponse = await axios.get(`${this.projectRoot}/.eslintrc`);
      const tslintResponse = await axios.get(`${this.projectRoot}/tslint.json`);
      return eslintResponse.status === 200 || tslintResponse.status === 200;
    } catch (error) {
      return false;
    }
  }

  async checkDependencies(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.projectRoot}/package.json`);
      if (response.status === 200) {
        const packageJson = response.data;
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

// Example usage:
const projectPath = 'https://api.github.com/graphql';
const correctnessChecker = new Correctness(projectPath);
correctnessChecker.runChecks();