import { chatAppAPI } from "../axios.services"
import type { IUser } from "@/models/user.model"


const create = (user: IUser)=>{
    return chatAppAPI.post('/new', { pseudo: user.pseudo, password: user.password })
}

export {
    create
}