import { defineStore } from 'pinia';
import { socket } from '@/socket';
import { Conversation, type IConversation } from '@/models/conversation.model';
import ConversationService from '@/services/conversation.services';

export const useConversationsListStore = defineStore('conversationsListStore', {
  state: ()=>({
    conversationList: [] as Conversation[]
  }),
  actions: {
    async refreshList(){
      this.conversationList = [];
      try {
        const result = await ConversationService.getConversationList()
        result.forEach((conversation)=> this.conversationList.push(new Conversation(conversation)))
      } catch (error) {}
    },

    addList(token:string , newConversation: IConversation){
      return new Promise<string>(async (resolve, reject)=>{
        socket.emit('createConversation', token, newConversation.name, (error: any, conversation: IConversation)=>{
          if(error) {            
            reject(error) 
          }else {
            this.conversationList.unshift(new Conversation(conversation))
            resolve(conversation.name)
          }
        })
      })
    },

    joinConversation(token:string, userId: string){
      return new Promise<string>(async (resolve, reject)=>{
        socket.emit('joinConversation', token, userId, (error: any, conversation: IConversation)=>{
          if(error) {           
            let conversationName = '';
            if(conversation) conversationName = conversation.name
            reject({message: error, conversationName}) 
          }else {
            this.conversationList.unshift(new Conversation(conversation))
            resolve(conversation.name)
          }
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