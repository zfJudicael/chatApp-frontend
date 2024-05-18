export interface IUser {
    id?: string,
    email: string,
    pseudo: string,
    password?: string
} 

export class User implements IUser {
    id?: string;
    email: string;
    pseudo: string;
    password?: string;

    constructor(params: IUser) {
        this.id = params.id;
        this.email = params.email;
        this.pseudo = params.pseudo;
        this.password = params.password;
    }
}