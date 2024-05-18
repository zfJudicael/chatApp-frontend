<template>
<div class="register flex justify-center items-center mt-48">
    <div class=" w-max h-max pt-12 pb-12 pl-6 pr-6 bg-gray-200 text-center rounded-lg shadow-lg shadow-gray-700">
        <h1 class="mb-2 border-gray-400 border-b-2 text-xl pb-2">Création d'un nouveau compte</h1>
        <form class="mt-12" @submit="createNewUser">
            <div class="mb-2">
                <label for="username" class="mr-2 inline-block w-32">Pseudo :</label>
                <InputText id="username" class="p-1 w-56" autofocus="true" autocomplete="false" required="true" v-model="user.pseudo"/>
            </div>
            <div class="mb-4">
                <label for="firstPassword" class="mr-2 inline-block w-32">Mots de passe :</label>
                <Password toggleMask :feedback="false" input-id="firstPassword" class="h-8" :required="true" placeholder="Premier essaye" v-model="firstPassword"/>
            </div>
            <div class="mb-4">
                <label for="secondPassword" class="mr-2 inline-block w-32"></label>
                <Password toggleMask :feedback="false" input-id="secondPassword" class=" h-8" :required="true" placeholder="Ecrivez le à nouveau" v-model="secondPassword"/>
            </div>
            <div class="text-xl" v-if="!isResponseEmpty">{{ message }}</div>
            <div class="flex justify-center space-x-4 text-white">
                <input type="submit" value="Confirmer" class="bg-blue-600 basis-3/5 p-2 rounded-md hover:cursor-pointer hover:bg-blue-500">
                <input type="button" value="Annuler" @click="$router.push({name: 'login'})" class="bg-green-500 basis-2/5 p-2 rounded-md hover:cursor-pointer hover:bg-green-600">
            </div>
        </form>
        <div class="text-9xl" v-if="loading">Okayy</div>
    </div>
</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user.store';
import type { IUser } from '@/models/user.model';
import { useAuthStore } from '@/stores/auth.store';
const user = reactive<IUser>({
    email: '',
    pseudo: ''
})
const firstPassword =  ref<string>('')
const secondPassword = ref<string>('')
const loading = ref(false)
const isResponseEmpty = ref(true)
const message = ref<string>('')

const userStore = useUserStore()
const createNewUser = async (e: Event)=>{
    e.preventDefault()
    loading.value = true

    user.password = firstPassword.value.trim()
    useUserStore().create(user, ()=>{
        loading.value = false
        isResponseEmpty.value = false
        message.value = userStore.message

        if(userStore.success) useAuthStore().login(user)
    })
}

</script>