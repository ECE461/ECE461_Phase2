import axios from 'axios';

export class rampUp {
    private repoOwner: string;
    private repoName: string;

    constructor(repoOwner: string, repoName: string) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
    }

    async getRepoStats() {
        try {
            const response = await axios.get(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}`, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`
                }
            });
            const { size, stargazers_count, forks_count } = response.data;

            const fileCount = await this.getFileCount();
            const lineCount = await this.getLineCount();
            const dependenciesCount = await this.getDependenciesCount();
            console.log('Repository Stats:', {
                fileCount,
                lineCount,
                dependenciesCount,
                size,
                stargazers_count,
                forks_count
            });
            return [
                `File Count: ${fileCount}`,
                ` Line Count: ${lineCount}`,
                ` Dependencies Count: ${dependenciesCount}`,
                ` Size: ${size}`,
                ` Stargazers Count: ${stargazers_count}`,
                ` Forks Count: ${forks_count}`
            ];
        } catch (error) {
            console.error('Error fetching repository stats:', error);
        }
    }

    private async getFileCount(): Promise<number> {
        // Implement logic to count files in the repository
        const response = await axios.get(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents`);
        return response.data.length;
    }

    private async getLineCount(): Promise<number> {
        // Implement logic to count lines of code in the repository
        const response = await axios.get(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/git/trees/main?recursive=1`);
        const tree = response.data.tree;
        let lineCount = 0;

        for (const file of tree) {
            if (file.type === 'blob') {
            const fileResponse = await axios.get(file.url);
            lineCount += fileResponse.data.content.split('\n').length;
            }
        }

        return lineCount;
    }

    private async getDependenciesCount(): Promise<number | undefined> {
        // Implement logic to count dependencies in the repository
        try {
            const response = await axios.get(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/package.json`);
            const packageJson = JSON.parse(Buffer.from(response.data.content, 'base64').toString());
            const dependencies = packageJson.dependencies || {};

            return Object.keys(dependencies).length;
        } catch (error) {
            console.error('Error fetching dependencies count:', error);
            return undefined; // Return undefined in case of an error
        }
    }
}