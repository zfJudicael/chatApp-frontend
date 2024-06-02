import ConversationApi from "./api/conversation.api";
import type { IConversation } from "@/models/conversation.model";

export default class ConversationService{
    public static async create(conversation: IConversation){
        return (await ConversationApi.new(conversation)).data.conversation
    }

    public static async getConversationList(){
        return (await ConversationApi.getList()).data.conversationList
    }

    public static async getAllConversation(){
        return (await ConversationApi.getAll()).data.conversation
    }
}