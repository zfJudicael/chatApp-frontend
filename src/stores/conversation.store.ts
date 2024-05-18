import { defineStore } from 'pinia'
import { chatAppAPI } from '@/services/axios.services'
import { socket } from '@/socket'

export const useConversationStore = defineStore('conversationStore', {
  state: ()=>({
    conversation: []
  }),
  actions: {
    createConversation(userId: string, name: string){
        return new Promise((resolve, reject)=>{
            socket.emit('createConversation', userId, name, (err: any)=>{
                if(err){
                    reject({message: 'Error'})
                }else{
                    resolve({message: 'Created'})
                }
            })
        })
    }, 
    async getAllConversation(){
        this.conversation = (await (chatAppAPI.get('/conversation'))).data
        return this.conversation
    }
  }
})