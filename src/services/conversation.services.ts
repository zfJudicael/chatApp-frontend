import ConversationApi from "./api/conversation.api";

export default class ConversationService{
    public static async getConversationList(){
        return (await ConversationApi.getList()).data.conversationList
    }

    public static async joinConversation(conversationToken: string){
        return (await ConversationApi.postJoin(conversationToken)).data.conversation
    }

    public static async getFullConversation(conversationId: string){
        return (await ConversationApi.getConversation(conversationId)).data.conversation
    }
}