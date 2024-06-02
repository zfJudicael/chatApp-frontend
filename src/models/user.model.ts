export interface IAuth {
    email: string,
    password: string
}

export interface IUser {
    _id?: string,
    email?: string,
    pseudo: string,
    password?: string,
    createdAt?: string,
    updatedAt?: string
} 

export class User implements IUser {
    _id: string | undefined;
    email: string | undefined;
    pseudo: string;
    password: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;

    constructor(params: IUser) {
        this._id = params._id;
        this.email = params.email;
        this.pseudo = params.pseudo;
        this.password = params.password;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}