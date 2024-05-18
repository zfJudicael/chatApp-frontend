import { defineStore } from "pinia";
import { socket } from '../socket'

export const useMessageStore = defineStore('messageStore', {
    state: ()=>{
        return {
            messages: []
        }
    },
    actions: {
        sendMessage(msg: string) {
            socket.emit('sendMessage', msg)
        }
    }

})