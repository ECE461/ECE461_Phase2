import axios from 'axios';

export class busFactor {
    private repoOwner: string;
    private repoName: string;

    constructor(repoOwner: string, repoName: string) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
    }

    public async calculateBusFactor(): Promise<string[]> {
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

        const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/commits?since=${twoYearsAgo.toISOString()}&sha=main`;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_TOKEN}`
                    }
                }
            );
            const contributors = new Set<string>();

            response.data.forEach((commit: any) => {
                contributors.add(commit.commit.author.name);
            });

            return Array.from(contributors);
        } catch (error) {
            console.error('Error fetching commits:', error);
            process.exit(1);
        }
    }
}