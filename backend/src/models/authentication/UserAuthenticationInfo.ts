/* UserAuthenticationInfo: contains user authentication info and methods
 * @method: getJson
 */
export class UserAuthenticationInfo {
    private password: string;
    
    // constructor: initialize password
    constructor(password: string) {
        this.password = password;
    }

    // Return json object of user authentication info
    getJson() {
        return {
            password: this.password
        }
    }
}