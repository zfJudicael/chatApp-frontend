<template>
<div class="login flex justify-center items-center mt-48">
    <div class=" w-max h-max pt-12 pb-12 pl-6 pr-6 bg-gray-200 text-center rounded-lg shadow-lg shadow-gray-700">
        <h1 class="mb-2 border-gray-400 border-b-2 text-xl pb-2">Connectez-vous</h1>
        <form class="mt-12" @submit="login">
            <div class="mb-2">
                <label for="pseudo" class="mr-2 inline-block w-32">Pseudo :</label>
                <InputText v-model="user.pseudo" id="pseudo" class="p-1 w-56" autofocus="true" autocomplete="false" required="true"/>
            </div>
            <div class="mb-4">
                <label for="password" class="mr-2 inline-block w-32">Mots de passe :</label>
                <Password v-model="user.password" toggleMask :feedback="false" input-id="password" class="h-8" :required="true"/>
            </div>
            <div class="flex justify-center space-x-4 text-white">
                <input type="submit" value="Se connecter" class="bg-blue-600 basis-3/5 p-2 rounded-md hover:cursor-pointer hover:bg-blue-500">
                <input type="button" value="Créer un compte" @click="$router.push({name: 'register'})" class="bg-green-500 basis-2/5 p-2 rounded-md hover:cursor-pointer hover:bg-green-600">
            </div>
        </form>
    </div>
</div>
   
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { reactive } from 'vue';
import type { IUser } from '@/models/user.model';

const user = reactive<IUser>({
    email: '',
    pseudo: ''
})

const authStore = useAuthStore()

const login = (e: Event)=>{
    e.preventDefault()
    user.password = user.password!.trim()
    authStore.login(user)
}


</script>

<style>
</style>