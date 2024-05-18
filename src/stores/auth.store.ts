import { defineStore } from 'pinia';
import { reactive } from 'vue';
import router from '@/router';
import { jwtDecode } from 'jwt-decode';
import type { IUser } from '@/models/user.model';
import { chatAppAPI } from '@/services/axios.services';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('chatAppToken') || '',
    success: false,
    message: '',
    user: reactive<IUser>({
      pseudo: ''
    })
  }),
  actions: {
    async init() {
      if (this.token) {
        try {
          let decoded: IUser = await jwtDecode(this.token)
          this.user = decoded
        } catch (err) {
          localStorage.setItem('chatAppToken', '')
        }
      }
    },
    redirect() {
      router.isReady()
        .then(() => {
          if (this.user.pseudo === '') {
            if (router.currentRoute.value.name === 'register') {
              return;
            } else {
              router.push({ name: 'login' })
            }
          }
        })
    },
    login(user: IUser) {
      chatAppAPI.post('/login', user)
        .then((response) => {
          this.success = response.data.success
          this.message = response.data.message
          this.token = response.data.token
          localStorage.setItem('chatAppToken', response.data.token)

          let decoded: IUser = jwtDecode(this.token)
          this.user = decoded
          if (this.success) router.push({ name: 'home' })
        })
        .catch((err) => {
          this.success = err.response.data.success
          this.message = err.response.data.message
          this.token = err.response.data.token
          localStorage.setItem('chatAppToken', err.response.data.token)
        })
    },
    checkUser(){
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token
      }}
      chatAppAPI.get('/user/check', config )
                .then((response)=>{
                  if(response.data.success){
                    return;
                  }
                })
                .catch(()=>{
                  this.token = ''
                  localStorage.setItem('chatAppToken', '')
                  router.push({name: 'login'})
                })
    }
  }
})
