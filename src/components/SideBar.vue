<template>
    <div class="sidebar text-center p-10">
        <p>Pseudo : {{ pseudo }}</p>
        <div class="conv">
            <form @submit.prevent="create" class="w-">
                <div>
                    <label for="name">Name : </label>
                    <input type="text" id="name" class="p-1" placeholder="Write the conversation name..." v-model="convName" required>
                </div>
                <input type="submit" value="Create a conversation" class="p-2 bg-blue-600 text-white rounded-md hover:cursor-pointer hover:bg-blue-500">
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store';
import { useConversationStore } from '@/stores/conversation.store';
const pseudo = ref('')
const convName = ref('')

const conversationStore = useConversationStore()
onMounted(()=>{
    pseudo.value = useAuthStore().user.pseudo
})

const create = async ()=>{
    try {
        const result = await conversationStore.createConversation(useAuthStore().user._id!, convName.value)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
</script>