import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';
import { User } from '@/models/user.model';
import AuthService from '@/services/auth.services';
import { socket } from '@/socket';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: "",
    user: ref<User>()
  }),
  actions: {
    async init() {
      try {
        const token = localStorage.getItem('chatAppToken')
        if(token){
          this.token = token;
          this.user = new User(await AuthService.getCurrentUser())
          socket.connect()
        }else{
          throw new Error('There is no token')
        }
      } catch (err) {
        localStorage.removeItem('chatAppToken')
      }
    },
    async redirect() {
      await router.isReady()
        .then(() => {
          if (this.user) {
            router.push({name: 'welcome'})
          }else{
            if (router.currentRoute.value.name === 'register') {
              return;
            } else {
              router.push({ name: 'login' })
            }
          }
        })
    }
  },
  getters: {
    getPseudo(state){
      return state.user?.pseudo
    },

    getEmail(state){
      return state.user?.email
    }
  }
})
