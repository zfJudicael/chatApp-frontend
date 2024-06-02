<template>
    <div class="sidebar">
        <div class="user">
            <Avatar class="userAvatar" icon="pi pi-user" size="xlarge" shape="circle" />
            <div class="userInfo">
                <p>{{ authStore.getPseudo }}</p>
                <small>{{ authStore.getEmail }}</small>
            </div>
        </div>
        <br>
        <div class="newConversation" @click="visible= true">
            <span class="pi pi-plus-circle" style="font-size: 2.5rem;"></span>
            <p>Créer une nouvelle conversation</p>
        </div>
        <div class="conversationsList">
            <ConversationC v-for="conversation in conversationsListStore.getList" :conversation="conversation" 
            @click="$router.push({name: 'conversationView', params: { '_id': conversation._id }})" />
        </div>
        <Dialog v-model:visible="visible" modal header="Création d'une nouvelle conversation" :style="{ width: '25rem' }" :draggable="false" @hide="()=>{
            newConversation.name = ''
            conversationNameError = false
        }">
            <span class="p-text-secondary">Donnez un nom à votre conversation</span>
            <div id="DialogInput">
                <label for="username" class="font-semibold w-6rem">Nom : </label>
                <InputText id="username" v-model="newConversation.name"
                    autocomplete="off" 
                    placeholder="Entrez ici..." :invalid="conversationNameError"/>
                <InlineMessage class="inlineMessage" v-if="conversationNameError">{{ conversationNameErrorMessage }}</InlineMessage>
            </div>
            <div id="DialogButton">
                <Button type="button" class="create" label="Créer" @click="createNewConversation"></Button>
                <Button type="button" class="cancel" label="Annuler" severity="secondary" @click="visible = false"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';
import { useToast } from 'primevue/usetoast';
import ConversationC from './ConversationC.vue';
import type { IConversation } from '@/models/conversation.model';
import { useConversationsListStore } from '@/stores/conversationsList.store';


const toast = useToast()
const newConversation = reactive<IConversation>({
    name: ''
})
const conversationsListStore = useConversationsListStore()

const visible = ref(false)
const authStore = useAuthStore()

onMounted(async ()=>{
    await conversationsListStore.refreshList()
})

const conversationNameError = ref(false)
const conversationNameErrorMessage = ref('')
const handleConversationName = ()=>{
    if(newConversation.name){
        conversationNameError.value = false
    }else{
        conversationNameError.value = true
        conversationNameErrorMessage.value = 'Champ requise'
    }
    return !conversationNameError.value
}

const createNewConversation = async ()=>{
    if(handleConversationName()){
        try {
            if(authStore.user?._id){
                await conversationsListStore.addList(newConversation)
                toast.add({ severity: 'success', detail: 'Conversation créé avec succès', life: 6000 });
            }else{
                await authStore.init()
                authStore.redirect()
            }
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Création de la nouvelle conversation echouée', detail: 'Erreur du serveur, veuillez réessayer', life: 6000 });
        }
        visible.value = false;
    }
}
</script>

<style>
.sidebar {
    background-image: linear-gradient(to top , #6DD5FA, #2980B9);
    height: 100vh;
    padding: 10px;
}

.sidebar .user{
    display: flex;
    align-items: center;
    padding: 5px;
    background-color: white;
    border-radius: 15px;
}

.sidebar .user .userAvatar{
    margin-right: 10px;
}

.sidebar .user .userInfo p{
    margin: 0;
}

.sidebar .newConversation{
    background-color: aliceblue;
    display: flex;
    align-items: center;
    padding: 5px;
    width: fit-content;
    border-radius: 30px;
    margin-bottom: 2px;
}

.sidebar .newConversation p{
    margin: 0 5px;
}

.sidebar .newConversation:hover{
    cursor: pointer;
}

.sidebar .newConversation p:hover{
    text-decoration: underline;
}

.sidebar .conversationsList{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}


#DialogInput {
    margin: 20px 0 20px 0;
}

#DialogInput .inlineMessage{
    margin-top: 2px;
}

#DialogInput .inlineMessage .p-inline-message-text{
    font-size: small;
}

#DialogButton {
    display: flex;
    gap: 5px;
}

#DialogButton .create{
    flex-grow: 1;
}

#DialogButton .cancel:hover{
    outline:1px solid #2980B9;
}
</style>