import { chatApp, chatAppAPI } from "../axios.services"
import type { IApiResponse, IApiTokenResponse, IApiAuthResponse } from "../../interfaces/ApiResponse"
import type { IAuth, IUser } from "@/models/user.model"

export default class AuthApi 
{
    public static postSignUp(user:IUser) : Promise<{data: IApiResponse}>
    {
        return chatApp.post('/auth/new', user)
    }

    public static postSignIn(payload: IAuth) : Promise<{data: IApiTokenResponse}>
    {
        return chatApp.post('/auth/login', payload)
    }

    public static getMe() : Promise<{data : IApiAuthResponse }>{
        return chatAppAPI.get('/me')
    }
}