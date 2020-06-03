import * as fs from "fs";
import * as path from "path";

const dataPath: string = path.join("db.json");

export class User {
    constructor(public email: string,
        public name: string,
        public password: string) { }

    matches(user: User): boolean {
        return user !== undefined &&
            user.email === this.email &&
            user.password === this.password;
    }
}

export function findUser(email: string): User {
    const content: string = fs.readFileSync(dataPath, "utf8");
    const jsonDb: any = JSON.parse(content);
    if (jsonDb.users) {
        const dbUser: User = jsonDb.users.find((u: User) => u.email === email);
        if(dbUser) {
            return new User(dbUser.email, dbUser.name, dbUser.password);
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}
