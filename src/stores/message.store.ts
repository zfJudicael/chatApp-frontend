import { defineStore } from "pinia";
import { socket } from '../socket'
import type { IMessage } from "@/models/message.model";

export const useMessageStore = defineStore('messageStore', {
    state: ()=>{
        return {
            messages: []
        }
    },
    actions: {
        sendMessage(message: IMessage) {
            socket.emit('sendMessage', message)
        }
    }
})