import type { IConversation } from "@/models/conversation.model"
import type { IUser } from "@/models/user.model"

export interface IApiResponse {
    success: boolean,
    message?: string
}

export interface IApiTokenResponse extends IApiResponse{
    token: string
}

export interface IApiAuthResponse extends IApiResponse{
    user: IUser
}

export interface IApiConversationListResponse extends IApiAuthResponse{
    conversationList: IConversation[]
}

export interface IApiConversationResponse extends IApiResponse{
    conversation: IConversation
}