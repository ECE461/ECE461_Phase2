import axios from 'axios';

export class busFactor {
    private repoOwner: string;
    private repoName: string;

    constructor(repoOwner: string, repoName: string) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
    }

    public async calculateBusFactor(): Promise<number> {
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

        const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/commits?since=${twoYearsAgo.toISOString()}&sha=main`;
        //console.log(url);
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_TOKEN}`
                    }
                }
            );
            const contributors = new Set<string>();
            // Extract the author name from each commit
            response.data.forEach((commit: any) => {
                contributors.add(commit.commit.author.name);
            });
            //return Array.from(contributors);
            const numberOfContributors = contributors.size;
            const score = this.calculateBusFactorScore(numberOfContributors);
            return score;

        } catch (error) {
            console.error('Error fetching commits:', error);
            process.exit(1);
        }
    }

    private calculateBusFactorScore(contributors: number): number {
        // Calculate the bus factor score based on the number of contributors
        let score = 0;
        if (contributors >= 10) {
            score = 1;
        }
        else if (contributors >= 5) {
            score = 0.5;
        }
        else if (contributors >= 2) {
            score = 0.3;
        }
        else if (contributors >= 1) {
            score = 0.1;
        }
        else {
            score = 0;
        }

        return score;
    }

}