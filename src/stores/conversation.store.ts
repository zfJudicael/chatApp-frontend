import { defineStore } from "pinia";
import { socket } from '../socket'
import { Conversation } from "@/models/conversation.model";
import ConversationService from "@/services/conversation.services";
import type { IMessage } from "@/models/message.model";
import { ref } from "vue";

export const useConversationsStore = defineStore('conversationsStore', {
    state: ()=>{
        return {
            conversations: ref<Conversation[]>([])
        }
    },
    actions: {
        addConversation(conversationId: string) : Promise<void>{
            return new Promise(async (resolve, reject)=>{
                try {
                    let existed = false;
                    this.conversations.forEach((conversation)=>{
                        if(conversation._id === conversationId) existed = true
                    })
                    if(!existed){
                        const result = await ConversationService.getFullConversation(conversationId);
                        this.conversations.push(new Conversation(result))
                        resolve()
                    }else{
                        reject()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        },

        sendMessage(message: IMessage): Promise<void> {
            return new Promise((resolve, reject)=>{
                socket.emit('sendMessage', message, (error:any)=>{
                    if(error) reject(error)
                    else resolve()
                })
            })
        }
    },
    getters: {
        getConversation: (state)=>{
            return (conversationId: string)=> state.conversations.filter((conversation)=>{
                    return conversation._id === conversationId
                })[0]
        },
    }
})