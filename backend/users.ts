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
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda21'),
}
