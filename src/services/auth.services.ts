import AuthApi from '@/services/api/auth.api';
import type { IAuth, IUser } from "@/models/user.model";

export default class AuthService 
{
    public static async signUp(user: IUser)
    {
        return (await AuthApi.postSignUp(user)).data
    }

    public static async singIn(payload: IAuth){
        return (await AuthApi.postSignIn(payload)).data 
    }

    public static async getCurrentUser()
    {
        return (await AuthApi.getMe()).data.user;
    }
}