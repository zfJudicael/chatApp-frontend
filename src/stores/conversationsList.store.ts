import { defineStore } from 'pinia';
import { socket } from '@/socket';
import { ref } from 'vue';
import { Conversation, type IConversation } from '@/models/conversation.model';
import { useAuthStore } from './auth.store';
import ConversationService from '@/services/conversation.services';

export const useConversationsListStore = defineStore('conversationsListStore', {
  state: ()=>({
    conversationList: ref<Conversation[]>([])
  }),
  actions: {
    async refreshList(){
      this.conversationList = [];
      try {
        const result = await ConversationService.getConversationList()
        result.forEach((conversation)=> this.conversationList.push(new Conversation(conversation)))
      } catch (error) {}
    },

    addList(conversation: IConversation){
      return new Promise<void>(async (resolve, reject)=>{
        try{
          const result = await ConversationService.create(conversation)
          this.conversationList.push(new Conversation(result))
          resolve()
        }catch(error){
          reject(error)
        }
      })
    },

    joinConversation(conversationToken: string): Promise<void>{
      return new Promise(async (resolve, reject)=>{
        try {
          const result = await ConversationService.joinConversation(conversationToken) 
          resolve()       
        } catch (error) {
          reject(error)
        }
      })
    },

    join(token:string, userId: string){
      return new Promise<void>(async (resolve, reject)=>{
        socket.emit('joinConversation', token, userId, (error: any)=>{
          if(error) {            
            console.log(error)
            reject(error) 
          }else {
            console.log('OKy')
            resolve()}
        })
      })
    }
  },
  getters: {
    getList(state){
      return state.conversationList
    }
  }
})




// createConversation(userId: string, name: string){
    //     return new Promise((resolve, reject)=>{
    //         socket.emit('createConversation', userId, name, (err: any)=>{
    //             if(err){
    //                 reject({message: 'Error'})
    //             }else{
    //                 resolve({message: 'Created'})
    //             }
    //         })
    //     })
    // }, 
    // async getAllConversation(){
    //     this.conversation = (await (chatAppAPI.get('/conversation'))).data
    //     return this.conversation
    // }