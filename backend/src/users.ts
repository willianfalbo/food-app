import * as fs from 'fs';
import * as config from './config';

export class User {
    constructor(
        public email: string,
        public name: string,
        public password: string
    ) { }

    matches(user: User): boolean {
        return user !== undefined &&
            user.email === this.email &&
            user.password === this.password;
    }
}

export function findUser(email: string): User {
    const content: string = fs.readFileSync(config.JSON_SERVER_DBPATH, 'utf8');
    const jsonDb: any = JSON.parse(content);
    if (!jsonDb.users) {
        return undefined;
    }
    const user: User = jsonDb.users.find((u: User) => u.email === email);
    if(user) {
        return new User(user.email, user.name, user.password);
    } else {
        return undefined;
    }
}
