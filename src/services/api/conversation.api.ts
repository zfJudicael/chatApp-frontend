import type { IApiConversationListResponse, IApiConversationResponse } from "@/interfaces/ApiResponse";
import { chatAppAPI } from "../axios.services";
import type { IConversation } from "@/models/conversation.model";

export default class ConversationApi{
    public static new(conversation: IConversation) : Promise<{data: IApiConversationResponse}> {
        return chatAppAPI.post('/conversation/new', { conversation  })
    }

    public static getList() : Promise<{data: IApiConversationListResponse}>{
        return chatAppAPI.get('/conversation/list')
    }

    public static getAll() : Promise<{data: IApiConversationResponse}>{
        return chatAppAPI.get('/conversation')
    }
}