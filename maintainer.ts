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

        // find open to total issue ratio
        const openIssueRatio = await this.getOpenIssueRatioCount();
        console.log("Open Issue Ratio: ", openIssueRatio);

        // calculate score (0-1) based on how long ago last commit was
        // UDPATE SCORES WITH RATIO
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
     * Fetches the open issue count of the repository
     * 
     * @returns the open issue count
     */
    private async getOpenIssueRatioCount(): Promise<number> {
        const url = `https://api.github.com/repos/${this.owner}/${this.repoName}`;
        try {
            const response = await axios.get(url);
            const openIssues = response.data.open_issues_count;
            const closedIssues = response.data.closed_issues_count;
            console.log('Open Issue Count: ', openIssues);
            console.log('Closed Issue Count: ', closedIssues);
            if (closedIssues + openIssues === 0) {
                return 0;
            }
            else if (closedIssues === undefined) {
                return openIssues;
            }
            const ratio = openIssues / (openIssues + closedIssues);
            return ratio;
        } catch (error) {
            console.log('Error when fetching open issue ratio count: ', error);
            throw new Error('Error when fetching open issue ratio count');
        }
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
const maintainerChecker = new maintainer('AidanMDB', 'ECE-461-Team');
maintainerChecker.correctnessChecker();