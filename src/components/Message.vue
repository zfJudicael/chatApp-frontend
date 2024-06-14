<template>
    <div class="message" :class="{right: isRight, left: !isRight}">
        <Avatar class="userAvatar" icon="pi pi-user" size="large" shape="circle" />
        <p>{{ message.value }}</p>  
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import { CMessage } from '@/models/message.model';

defineProps({
    isRight :{
        type: Boolean,
        required: true
    },
    message :{
        type: CMessage,
        required: true
    }
})
</script>

<style>
.message{
    display: flex;
    gap: 10px;
    align-items: end;
    margin: 15px;
}

.message p{
    max-width: 200px;
    margin: 0;
    color: white;
    background-color: rgb(93, 165, 228);
    padding: 5px;  
}

.left{
    justify-content: left;
}

.right{
    justify-content: right;
    flex-direction: row-reverse;
}

.left p{
    border-radius: 20px 10px 10px 0px;
}

.right p{
    border-radius: 10px 20px 0px 10px;
}

@media only screen and (min-width: 768px) {
    .message p{
        max-width: 400px;   
    }
}

@media only screen and (min-width: 1024px) {
    .message p{
        max-width: 700px;   
    }
}
</style>