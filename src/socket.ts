import { io } from 'socket.io-client'
const URL = 'http://localhost:3000'
import { useAuthStore } from './stores/auth.store'

export const socket = io(URL, {
    autoConnect: false
})

socket.on('connect', ()=>{
    socket.emit('logIn', useAuthStore().user?._id)
})

// socket.on('disconnect', ()=>{
//     console.log('Disconnected')
// })