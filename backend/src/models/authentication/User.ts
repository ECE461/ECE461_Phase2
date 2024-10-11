/* User: class with user name and isAdmin status and methods
 * @method: getJson
 */
export class User {
    private name: string;
    private isAdmin: boolean;

    // constructor: initialize name and admin status
    constructor(name: string, isAdmin: boolean) {
        this.name = name;
        this.isAdmin = isAdmin;
    }

    // Return json object of user
    getJson() {
        return {
            Name: this.name,
            isAdmin: this.isAdmin
        }
    }
}