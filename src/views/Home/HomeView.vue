<template>
    <div class="home">
        <SideBar class="nav"/>
        <div class="content">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import{ onMounted, ref } from 'vue';
import SideBar from '@/components/SideBar.vue';
import { RouterView } from 'vue-router';
import { socket } from '@/socket';
import type { Conversation } from '@/models/conversation.model';

onMounted(()=>{
    
})

// //////////////////////////////////////////
// const messageStore = useMessageStore()
// const message = ref<string>('')

// const sendMessage = ()=>{
//     console.log(message.value)
//     // messageStore.sendMessage(message.value)
// }

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
    height: 100vh;
}
</style>