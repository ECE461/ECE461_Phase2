import axios from "axios";

export class maintainer {
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
     * Calculates the maintainer score of the repository
     * 
     * @returns the maintainer score
     */
    public async getMaintainerScore(): Promise<number> {
        // get the date of last commit
        const lastCommitDateStr = await this.getLastCommit();
        const lastCommitDate = new Date(lastCommitDateStr);
        const todayDate = new Date();

        // calculate difference in days between the last commit and today
        const dateDiff = Math.abs(todayDate.getTime() - lastCommitDate.getTime());
        const daysDiff = Math.ceil(dateDiff / (1000 * 3600 * 24));
        // console.log('Days Diff: ', daysDiff);

        // calculate score (0-1) based on how long ago last commit was
        let score = 0;
        if(daysDiff >= 365) {
            score = 0;
        }
        else if(daysDiff >= 292) {
            score = 0.2
        }
        else if(daysDiff >= 219) {
            score = 0.4
        }
        else if(daysDiff >= 146) {
            score = 0.6
        }
        else if(daysDiff >= 73) {
            score = 0.8
        }
        else {
            score = 1;
        }

        return score;
    }

    /**
     * Fetches the last commit date of the repository
     * 
     * @returns the date of the last commit
     */
    private async getLastCommit(): Promise<string> {
        const url = `https://api.github.com/repos/${this.owner}/${this.repoName}/commits`;
        try {
            const response = await axios.get(url);
            const lastCommit = response.data[0];
            console.log('Last Commit Data: ', lastCommit.commit.author.date);
            return lastCommit.commit.author.date;
        } catch (error) {
            console.log('Error when fetching last commit data: ', error);
            throw new Error('Error when fetching last commit data');
        }
    }

    async correctnessChecker() {
        console.log('Correctness Checker:');
        console.log('Maintainer Score: ', await this.getMaintainerScore());
    }

}

// Testing
const maintainerChecker = new maintainer('fishaudio', 'realtime-vc-gui');
maintainerChecker.correctnessChecker();