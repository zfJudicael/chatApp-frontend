<template>
    <div class="message" :class="{right: isRight, left: !isRight}">
        <Avatar class="userAvatar" icon="pi pi-user" size="large" shape="circle" />
        <div class="details">
            <p v-if="showDate" class="createdAt">{{useGetTimeFromIsoDate(props.message.createdAt)}}</p>
            <p @click="toggleShowDate" class="value">{{ message.value }}</p>  
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Avatar from 'primevue/avatar';
import { CMessage } from '@/models/message.model';
import useGetTimeFromIsoDate from '@/composables/getTimeFromIsoDate';

const props = defineProps({
    isRight :{
        type: Boolean,
        required: true
    },
    message :{
        type: CMessage,
        required: true
    }
})

const showDate = ref(false)

const toggleShowDate = ()=>{
    showDate.value = !showDate.value
}
</script>

<style>
.message{
    display: flex;
    gap: 10px;
    align-items: end;
    margin: 15px;
}
.message .details .createdAt{
    margin: 0;
    text-align: center;
    font-size: small;
}

.message .details .value{
    max-width: 200px;
    margin: 0;
    color: white;
    background-color: rgb(93, 165, 228);
    padding: 10px; 
    word-break: break-all;
}

.message .details .value:hover{
    cursor: pointer;
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
    .message .details .value{
        max-width: 400px;   
    }
}

@media only screen and (min-width: 1024px) {
    .message .details .value{
        max-width: 700px;   
    }
}
</style>