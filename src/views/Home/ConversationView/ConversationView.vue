<template>
    

</template>

<script setup lang="ts">
import { onMounted, onUpdated, reactive, ref } from 'vue'
import Button from 'primevue/button';
import Message from '@/components/Message.vue';
import { useConversationsStore } from '@/stores/conversation.store';
import type { IMessage } from '@/models/message.model';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const newMessage: IMessage = reactive({
    value: ''
})

const conversationsStore = useConversationsStore()
const route = useRoute()
const messagesList = ref<IMessage[]>([])

onMounted(async ()=>{
    messagesList.value = []
    try {
        console.log(messagesList.value)
    } catch (error) {
        
    }
})


const sendMessage = ()=>{
    if(newMessage.value && useAuthStore().user?._id){
        newMessage.from = useAuthStore().user?._id
        newMessage.to = route.params._id as string
        conversationsStore.sendMessage(newMessage)
    }
}
</script>

<style scoped>
.topNav{
    grid-row: 1;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
}

.messagesList{
    grid-row: 2/10;
    overflow-y: scroll;
}

form{
    grid-row: 11/12;
    display: flex;
    column-gap: 5px;
    align-items: center;
}

form textarea{
    resize: none;
    flex-grow: 10;
    border-radius: 10px;
    padding: 10px;
}

form button{
    flex-grow: 1;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    column-gap: 5px;
}
</style>