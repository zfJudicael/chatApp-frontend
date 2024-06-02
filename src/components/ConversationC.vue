<template>
    <div class="conversation">
        <Avatar class="conversationPhoto" icon="pi pi-envelope" size="large" shape="circle" />
        <div class="conversationInfo">
            <p>{{ conversation.name }}</p>
            <small>Last message...</small>
        </div>
        <div class="conversationMoreInfo" v-tooltip.bottom="{value:'Plus', showDelay: 800, hideDelay: 300}">
            <span class="pi pi-ellipsis-v"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import { Conversation } from '@/models/conversation.model';

defineProps({
    conversation : {
        type: Conversation,
        required: true
    }  
})
</script>

<style>
.conversation{
    display: flex;
    background-color: azure;
    padding: 4px;
    border-radius: 40px;
    align-items: center;
    margin: 2px;
}

.conversation .conversationPhoto {
    margin-right: 5px;
}

.conversation .conversationInfo{
    flex-grow: 6;
}

.conversation .conversationInfo p{
    margin: 0
}

.conversation .conversationMoreInfo{
    flex-grow: 1;
    text-align: center;
}

.conversation:hover{
    cursor: pointer;
    outline: 2px solid black;
}
</style>