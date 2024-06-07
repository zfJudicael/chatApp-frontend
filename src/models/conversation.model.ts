import type { IMessage } from "./message.model";

export interface IConversation{
    _id?: string,
    name: string,
    members?: string[],
    messages: IMessage[],
    token?: string,
    createdAt?: string,
    updatedAt?: string
} 

export class Conversation implements IConversation{
    _id: string | undefined;
    name: string;
    members: string[] | undefined;
    messages: IMessage[];
    token?: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;

    constructor(params: IConversation){
        this._id = params._id;
        this.name = params.name;
        this.members = params.members;
        this.messages = params.messages;
        this.token = params.token;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
