import { defineStore } from "pinia";
import { socket } from '../socket'
import { Conversation } from "@/models/conversation.model";
import ConversationService from "@/services/conversation.services";
import type { IMessage } from "@/models/message.model";

export const useConversationsStore = defineStore('conversationsStore', {
    state: ()=>{
        return {
            conversations: [] as Conversation[]
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

        sendMessage(message: IMessage): Promise<IMessage> {
            return new Promise((resolve, reject)=>{
                socket.emit('sendMessage', message, (error:any, newMessage: IMessage)=>{
                    if(error) reject(error)
                    else {
                        this.addNewMessage(newMessage)
                        resolve(newMessage)
                    }
                })
            })
        },

        addNewMessage(newMessage: IMessage){
            let index = 0
            if(this.conversations.some((conversation)=>{
                index++
                return conversation._id === newMessage.to
            })) this.conversations[index - 1].messages.push(newMessage)
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