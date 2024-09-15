import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const GITHUB_API = 'https://raw.githubusercontent.com';



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
   * @returns 0 or 1 if the LGPLv2.1 is in the file
   */
  private async getFileContent(path: string) : Promise<string | null> {
    try {
      const url = `${GITHUB_API}/${this.owner}/${this.repoName}/main/${path}`;
      const response = await axios.get(url, 
        {
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          }
        }
      );
      return response.data.includes('LGPLv2.1');  

    } catch (error) {
      console.error(`Error when fetching file content in ${this.owner}/${this.repoName}: ${error}`);
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