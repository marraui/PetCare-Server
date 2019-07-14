export class User {
    email: string;

    constructor(user?: any) {
        this.email = user && user.email || '';
    }
}