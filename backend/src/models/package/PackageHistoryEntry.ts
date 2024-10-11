import { User } from "../authentication/User";
import { PackageMetadata } from "./PackageMetadata";

enum Action {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DOWNLOAD = "DOWNLOAD",
    RATE = "RATE"
}

export class PackageHistoryEntry {
    
    private user: User;
    private date: string; // ex: 2023-03-23T23:11:15Z
    private metadata: PackageMetadata;
    private action: Action;

    constructor(user: User, date: string, metadata: PackageMetadata, action: Action) {
        // TODO: might change this to something that pools from database???
        this.user = user;
        this.date = date;
        this.metadata = metadata;
        this.action = action;
    }

    getJson() {
        return {
            User: this.user.getJson(),
            Date: this.date,
            PackageMetadata: this.metadata.getJson(),
            Action: this.action
        }
    }
}
