export interface IMessage{
    _id?: string,
    from?: string,
    to?: string,
    value: string,
    createdAt?: string
}

export class CMessage implements IMessage{
    _id?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    value: string;
    createdAt?: string | undefined;

    constructor(params: IMessage){
        this._id = params._id;
        this.from = params.from;
        this.to = params.to;
        this.value = params.value;
        this.createdAt = params.createdAt
    }

    public getValue(){
        return this.value
    }
}