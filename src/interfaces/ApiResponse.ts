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