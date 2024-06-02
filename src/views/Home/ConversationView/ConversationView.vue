<template>
    <div class="topNav">
        <Button type="button" label="Retour" @click="$router.push({name: 'welcome'})" severity="info" raised/>
    </div>
    <div class="messagesList">
        <Message :isRight="true"/>
        <Message :isRight="false"/>
        <Message :isRight="true"/>
        <Message :isRight="false"/>
    </div>
    <form @submit.prevent="sendMessage">
        <textarea v-model="newMessage.value" placeholder="Tapez votre message ici..." rows="3" id="text"></textarea>
        <Button type="submit" severity="info" raised>Envoyer <span class="pi pi-send"></span></Button>
    </form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Button from 'primevue/button';
import Message from '@/components/Message.vue';
import { useMessageStore } from '@/stores/message.store';
import type { IMessage } from '@/models/message.model';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const newMessage: IMessage = reactive({
    value: ''
})
const route = useRoute()
onMounted(()=>{
})

const sendMessage = ()=>{
    if(newMessage.value){
        if(useAuthStore().user?._id){
            newMessage.from = useAuthStore().user?._id
            newMessage.to = route.params._id as string
            useMessageStore().sendMessage(newMessage)
        }
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