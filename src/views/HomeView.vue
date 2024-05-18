<template>
    <div class="home grid md:grid-cols-5">
        <SideBar class="bg-blue-200 md:col-span-1 md:h-screen"/>
        <div class="md:col-span-4 md:h-screen grid grid-rows-10">
            <div class="messages row-span-9 overflow-y-scroll p-4 overflow-x-hidden">
                <div class="w-full m-1 flex justify-start">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Coucou</p>    
                </div>
                <div class="w-full m-1 flex justify-end text-right">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Cc!!</p>    
                </div>

                <div class="w-full m-1 flex justify-start">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero exercitationem pariatur nam obcaecati aliquam iste </p>    
                </div>
                <div class="w-full m-1 flex justify-end text-right">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl"> itaque suscipit nihil excepturi tempore!</p>    
                </div>
                <div class="w-full m-1 flex justify-start">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Lorem ipsum dolor</p>    
                </div>
                <div class="w-full m-1 flex justify-end text-right">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero exercitationem pariatur nam obcaecati aliquam iste commodi veritatis provident similique eligendi voluptatum tempora dolore, impedit itaque suscipit nihil excepturi tempore!</p>    
                </div>
                <div class="w-full m-1 flex justify-start">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl"> commodi veritatis provident similique eligendi voluptatum tempora dolore, impedit itaque suscipit nihil excepturi tempore!</p>    
                </div>
                <div class="w-full m-1 flex justify-end text-right">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero exercitationem pariatur nam obcaecati aliquam iste commodi veritatis provident similique eligendi voluptatum tempora dolore, impedit itaque suscipit nihil excepturi tempore!</p>    
                </div>
                <div class="w-full m-1 flex justify-start">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero exercitationem pariatur nam obcaecati aliquam iste commodi veritatis provident similique eligendi voluptatum tempora dolore, impedit itaque suscipit nihil excepturi tempore!</p>    
                </div>
                <div class="w-full m-1 flex justify-end text-right">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero exercitationem pariatur nam obcaecati aliquam iste commodi veritatis provident similique eligendi voluptatum tempora dolore, impedit itaque suscipit nihil excepturi tempore!</p>    
                </div>
                <div class="w-full m-1 flex justify-start">
                    <p class="max-w-3xl bg-blue-200 p-2 rounded-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero exercitationem pariatur nam obcaecati aliquam iste commodi veritatis provident similique eligendi voluptatum tempora dolore, impedit itaque suscipit nihil excepturi tempore!</p>    
                </div>
            </div>
            <form class="row-span-1" @submit.prevent="sendMessage">
                <div class="flex items-center justify-around h-full">
                    <textarea v-model="message" placeholder="Type your message..." rows="1" id="text" class="border-gray-400 border-2 box-border basis-5/6 m-2 p-3 rounded-md"></textarea>
                    <input type="submit" class="text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer basis-1/6 mr-4 rounded-xl h-10 w-40" value="Send">
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import{ computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store';
import { useMessageStore } from '@/stores/message.store';
import SideBar from '../components/SideBar.vue'
import { socket } from '@/socket';

onMounted(()=>{
    useAuthStore().checkUser()
})

const connected = computed(()=>{
    return true
})

//////////////////////////////////////////
const messageStore = useMessageStore()
const message = ref<string>('')

const sendMessage = ()=>{
    messageStore.sendMessage(message.value)
}

</script>