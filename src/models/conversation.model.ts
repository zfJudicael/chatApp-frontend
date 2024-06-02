export interface IConversation{
    _id?: string,
    name: string,
    members?: string[],
    messages?: string[],
    createdAt?: string,
    updatedAt?: string
} 

export class Conversation implements IConversation{
    _id: string | undefined;
    name: string;
    members: string[] | undefined;
    messages: string[] | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;

    constructor(params: IConversation){
        this._id = params._id;
        this.name = params.name;
        this.members = params.members;
        this.messages = params.messages;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
