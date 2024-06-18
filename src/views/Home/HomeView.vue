<template>
    <div class="home">
        <SideBar class="nav" v-model="selectedConversationId"/>
        <div class="content">
            <template v-if="selectedConversationId">
                <div class="topNav">
                    <Button type="button" label="Retour" icon="pi pi-caret-left" @click="selectedConversationId = ''" severity="info" raised/>
                    <p>{{ conversationName }}</p>
                    <Button type="button" @click="visible=true" label="Inviter" icon="pi pi-share-alt"></Button>
                </div>
                <div class="messagesList" ref="msgDiv">
                    <template v-for="(message, index) in messagesList">
                        <p v-if="isSentInDifferentDay(index)" class="days">{{ formatDateToDay(message.createdAt!) }}</p>
                        <Message :isRight="isMessageMine(message)" :message="new CMessage(message)"/>
                    </template>
                </div>
                <form @submit.prevent="sendMessage">
                    <textarea v-model.trim="newMessage.value" placeholder="Tapez votre message ici..." rows="3" id="text"
                    @keyup.ctrl.enter="sendMessage"></textarea>
                    <Button type="submit" severity="info" raised>Envoyer <span class="pi pi-send"></span></Button>
                </form>
            </template>
            <template v-else>
                Welcome
            </template>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Invitation pour la conversation" :style="{ width: '25rem' }" :draggable="false" @hide="copyLabel = 'Copier'">
        <small>Copiez et partagez cette texte(Validité 24heures)</small>
        <Textarea v-model="conversationToken" disabled autoResize cols="30"/>
        <Button @click="copyToClipboard" icon="pi pi-clipboard" :label="copyLabel"></Button>
    </Dialog>
</template>

<script setup lang="ts">
import{ ref, reactive, watch, nextTick, computed } from 'vue';
import SideBar from '@/components/SideBar.vue';
import Message from '@/components/Message.vue';
import { useConversationsStore } from '@/stores/conversation.store';
import { useAuthStore } from '@/stores/auth.store';
import { CMessage, type IMessage } from '@/models/message.model';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import { socket } from '@/socket';
import useFormatDate from '@/composables/formatDate';

const visible = ref(false)
const selectedConversationId = ref('')
const newMessage: IMessage = reactive({
    value: ''
})
const conversationsStore = useConversationsStore()
const messagesList = ref<IMessage[]>([])
const conversationName = ref('')
const conversationToken = ref('')

const loadMessages = ()=>{
    messagesList.value = []
    if(selectedConversationId.value) {
        let { name, messages, token } = conversationsStore.getConversation(selectedConversationId.value)
        conversationName.value = name
        messagesList.value = messages
        if(token) conversationToken.value = token
    }
}

watch(selectedConversationId, ()=>{
    newMessage.value = ''
    conversationName.value = ''
    conversationToken.value = ''
    loadMessages()
})

const msgDiv = ref<HTMLElement>()
const focusBottomScrollBar = ()=>{
    nextTick(()=>{
        if(msgDiv.value) msgDiv.value.scrollTop = msgDiv.value.scrollHeight
    })
} 

watch(selectedConversationId, ()=>{
    focusBottomScrollBar()
})

const sendMessage = async ()=>{
    if(newMessage.value && useAuthStore().user?._id){
        newMessage.from = useAuthStore().user?._id
        newMessage.to = selectedConversationId.value
        try {
            await conversationsStore.sendMessage(newMessage)
            newMessage.value = ''
            focusBottomScrollBar()
        } catch (error) {
            console.log(error)
        }
    }
}

const isMessageMine = (message: IMessage)=>{
    return (message.from === useAuthStore().user?._id)
}

const isSentInDifferentDay = (index: number)=>{
    if(index === 0) return true

    var dayBefore = useFormatDate(messagesList.value[index - 1].createdAt, 'L')
    var currentDay = useFormatDate(messagesList.value[index].createdAt, 'L')
    if(dayBefore !== currentDay) return true
    else return false
}

const formatDateToDay = (date: string)=>{
    return useFormatDate(date, 'LLLL')
}

const copyLabel = ref('Copier')
const copyToClipboard = ()=>{
    navigator.clipboard.writeText(conversationToken.value)
    copyLabel.value = 'Copié'
}

socket.on('newMessage', (newMessage: IMessage)=>{
    conversationsStore.addNewMessage(newMessage)
    focusBottomScrollBar()
})

</script>

<style>
.home {
    margin: 0;
}

.home .nav{
    width: 25%;
    float: left;
}

.home .content{
    width: 75%;
    float: left;
    padding: 20px 20px 0px 20px;
    display: grid;
    grid-template-rows: repeat(13, 1fr);
    height: 100vh;
}

.home .content .topNav{
    grid-row: 1/2;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.home .content .messagesList{
    grid-row: 2/12;
    overflow-x: hidden;
    overflow-y: scroll;
}

.home .content .messagesList .days{
    text-align: center;
    margin: 5px;
}

.home .content form{
    grid-row: 12/14;
    display: flex;
    column-gap: 5px;
    align-items: center;
}

.home .content form textarea{
    resize: none;
    flex-grow: 10;
    border-radius: 10px;
    padding: 10px;
}

.home .content form button{
    flex-grow: 1;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    column-gap: 5px;
}
</style>