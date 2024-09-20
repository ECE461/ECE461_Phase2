import axios from 'axios';

const GITHUB_API = 'https://raw.githubusercontent.com';
const NPM_API = 'https://registry.npmjs.org';


export class license {
  private owner: string;
  private repoName: string;
  /**
   * constructs a metrics manager for a GitHub repository
   * 
   * @param owner the owner of the repository
   * @param repoName the name of the repository
   */
  constructor(owner: string, repoName: string) {
      this.owner = owner;
      this.repoName = repoName;
  }


  /**
   * getFileContent returns a boolean if the file contains LGPLv2.1
   * 
   * @returns a boolean if the LGPLv2.1 is in the file, null if there is an error
   */
  private async getFileContent(path: string) : Promise<boolean | null> {
    try {
      const url = `${GITHUB_API}/${this.owner}/${this.repoName}/main/${path}`;
      const license_list = ['LGPLv2.1', 'MIT License', 'Apache License 2.0', 'BSD 3-Clause License']
      const response = await axios.get(url, 
        {
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          }
        }
      );
      return response.data.includes(license_list);  

    } catch (error) {
      //console.error(`Error when fetching file content in ${this.owner}/${this.repoName}  ${path}: ${error}`);
      //console.log(path);
      return null;
    }
  }

  /**
   * getRepoLicense returns the license of the package
   * 
   * @returns 1 if the license is LGPLv2.1, 0 otherwise
   */
  async getRepoLicense() : Promise<number> {
    try {
      
      // gets booleans of LICENSE and README.md files
      const [licenseFile, readMeFile] = await Promise.all([
        this.getFileContent('LICENSE'),
        this.getFileContent('README.md')
      ]);
      
      // checks if one or the other contains LGPLv2.1
      if (licenseFile || readMeFile) {
        //console.log('License Found: LGPLv2.1');
        return 1;
      }
      //console.log('License Not Found');
      return 0;

    } catch (error) {
      console.error(`Error when fetching license in ${this.owner}/${this.repoName}: ${error}`);
      return 0;
    }
  }


}