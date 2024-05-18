import { defineStore } from "pinia";
import type { IUser } from "@/models/user.model";
import { chatAppAPI } from "@/services/axios.services";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        success: false,
        user: [],
        message: ''
    }),
    actions: {
        create(user: IUser, callback: Function) {
            chatAppAPI.post('/user/new', { pseudo: user.pseudo, password: user.password })
                .then((response)=>{
                    this.success = response.data.success
                    this.message = response.data.message
                    callback()
                })
                .catch((err)=>{
                    this.success = err.response.data.success
                    this.message = err.response.data.message
                    callback()
                })
        }
    }
})