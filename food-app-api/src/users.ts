export class User {
    constructor(public email: string,
        public name: string,
        private password: string) { }

    matches(user: User): boolean {
        return user !== undefined &&
            user.email === this.email &&
            user.password === this.password
    }
}

export const users: {[key:string]: User} = {
    "willian@gmail.com": new User('willian@gmail.com', 'Willian', 'willian'),
    "felipe@gmail.com": new User('felipe@gmail.com', 'Felipe', 'felipe'),
}
