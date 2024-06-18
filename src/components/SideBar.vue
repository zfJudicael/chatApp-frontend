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
        <div class="joinConversation" @click="joinConvVisible= true">
            <span class="pi pi-plus-circle" style="font-size: 2.5rem;"></span>
            <p>Rejoindre une conversation</p>
        </div>
        <div class="conversationsList">
            <ConversationC v-for="conversation in conversationsListStore.getList" :conversation="conversation" 
                @click="openConversation(conversation)"/>
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

        <Dialog v-model:visible="joinConvVisible" modal header="Rejoindre une conversation" :style="{ width: '25rem' }" :draggable="false" @hide="()=>{
            conversationToken = ''
            conversationTokenError = false
        }">
            <div id="DialogInput">
                <Textarea name="conversationToken" v-model="conversationToken" autoResize cols="30" placeholder="Entrez la clé ici..." :invalid="conversationTokenError"/>
                <InlineMessage class="inlineMessage" v-if="conversationTokenError">{{ conversationTokenErrorMessage }}</InlineMessage>
            </div>
            <div id="DialogButton">
                <Button type="button" class="create" label="Confirmer" @click="joinConversation"></Button>
                <Button type="button" class="cancel" label="Annuler" severity="secondary" @click="joinConvVisible = false"></Button>
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
import { Conversation, type IConversation } from '@/models/conversation.model';
import { useConversationsListStore } from '@/stores/conversationsList.store';
import { useConversationsStore } from '@/stores/conversation.store';
import Textarea from 'primevue/textarea';

const toast = useToast()
const newConversation = reactive<IConversation>({
    name: '',
    messages: []
})
const conversationToken = ref('')

defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue'])

const conversationsListStore = useConversationsListStore()

const visible = ref(false)
const joinConvVisible = ref(false)
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

const conversationTokenError = ref(false)
const conversationTokenErrorMessage = ref('')
const handleConversationToken = ()=>{
    if(conversationToken.value){
        conversationTokenError.value = false
    }else{
        conversationTokenError.value = true
        conversationTokenErrorMessage.value = 'Champ requise'
    }
    return !conversationTokenError.value
}

const createNewConversation = async ()=>{
    if(handleConversationName()){
        try {
            if(authStore.token && authStore.user?._id){
                let newConversationName = await conversationsListStore.addList(authStore.token, newConversation)
                toast.add({ severity: 'success', detail: `La conversation '${newConversationName}' est créée avec succès`, life: 6000 });
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

const joinConversation = async ()=>{
    if(handleConversationToken()){
        try {
            if(authStore.user?._id){
                let newConversationName = await conversationsListStore.joinConversation(conversationToken.value, authStore.user?._id)
                toast.add({ severity: 'success', detail: `Vous avez pu rejoindre la conversation '${newConversationName}' avec succès`, life: 6000 });
            }else{
                await authStore.init()
                authStore.redirect()
            }
        } catch (error: any) {
            switch(error.message){
                case 'CONVERSATION_NOT_FOUND':
                    toast.add({ severity: 'error', summary: "Conversation non trouvée", detail: "Peut être qu'elle est déja supprimée ou n'a jamais existée", life: 6000 });
                    break;
                case 'USER_ALREADY_MEMBER_OF_THE_CONVERSATION':
                    toast.add({ severity: 'info', summary: `Vous etes déjà membre de la conversation '${error.conversationName}'`, life: 6000 });
                    break;
                default :
                    toast.add({ severity: 'error', summary: "Vous n'avez pas pu rejoindre cette conversation", detail: "Peut être que la clé n'est plus valide", life: 6000 });
                    break;
            }
        }
        joinConvVisible.value = false;
    }
}

const openConversation = async (conversation: Conversation)=>{
    try {
        await useConversationsStore().addConversation(conversation._id as string)
    } catch (error) {}
    emit('update:modelValue', conversation._id)
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

.sidebar .newConversation, .sidebar .joinConversation{
    background-color: aliceblue;
    display: flex;
    align-items: center;
    padding: 5px;
    width: fit-content;
    border-radius: 30px;
    margin-bottom: 2px;
}

.sidebar .newConversation p, .sidebar .joinConversation p{
    margin: 0 5px;
}

.sidebar .newConversation:hover, .sidebar .joinConversation:hover{
    cursor: pointer;
}

.sidebar .newConversation p:hover, .sidebar .joinConversation p:hover{
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