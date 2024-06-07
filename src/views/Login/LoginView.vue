<template>
<div class="login">
    <form @submit="onSubmit">
        <h3>Connexion</h3>

        <hr>

        <div class="input">
            <label for="email">Email :</label>
            <InputText id="email" v-model="user.email"
                placeholder="Adresse email..."
                autocomplete="false" 
                aria-describedby="email-help"
                :invalid="errorEmail"
            />
            <InlineMessage class="inlineMessage" v-if="errorEmail">{{ emailErrorMessage }}</InlineMessage>
        </div>
        <div class="input">
            <label for="firstPassword">Mots de passe :</label>
            <Password input-id="firstPassword" v-model.trim="user.password"
                toggleMask 
                :feedback="false"  
                placeholder="#######"
                class="password" 
                :invalid="errorPassword" 
            />
            <InlineMessage class="inlineMessage" v-if="errorPassword">{{ passwordErrorMessage }}</InlineMessage>
        </div>

        <hr>

        <div class="button">
            <Button type="submit" label="Confirmer" severity="info" class="confirmer"/>
            <Button label="Annuler" type="button" severity="info" text class="cancel"/>
        </div>
        <small class="question">Vous n'avez pas encore un compte?<RouterLink :to="{name : 'register'}">Inscrivez vous</RouterLink> </small>
    </form>
</div>
   
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InlineMessage from 'primevue/inlinemessage';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import type { IAuth } from '@/models/user.model';
import useValidateEmail from '@/composables/validateEmail';
import AuthService from '@/services/auth.services';
import { useAuthStore } from '@/stores/auth.store';

const toast = useToast();
const user = reactive<IAuth>({
    email: '',
    password: ''
})

const errorEmail = ref(false)
const emailErrorMessage = ref('')
const handleEmail = ()=>{
    let isValid = false;
    if(user.email){
        if(useValidateEmail(user.email)){
            errorEmail.value = false
            isValid = true
        }else{
            errorEmail.value = true
            emailErrorMessage.value = 'L\'adresse email n\'est pas valide '
        }
    }else{
        errorEmail.value = true
        emailErrorMessage.value = 'Adresse email requise'
    }
    return isValid;
}

const errorPassword = ref(false)
const passwordErrorMessage = ref('')
const handlePassword = ()=>{
    let isValid = false;
    if(user.password){
        errorPassword.value = false
        if(user.password.length < 5){
            errorPassword.value = true
            passwordErrorMessage.value = '5 caractères minimum'
        }else{
            errorPassword.value = false
            isValid = true
        }
    }else{
        errorPassword.value = true
        passwordErrorMessage.value = 'Mots de passe requise'
    }
    return isValid;
}

watch(user, (newValue)=>{
    if(newValue.password){
        if(newValue.password.length < 5){
            errorPassword.value = true
            passwordErrorMessage.value = '5 caractères minimum'
        }else{
            errorPassword.value = false
        }
    }
})

const formValidation = ()=>{
    return (handleEmail() && handlePassword())
}

const onSubmit = async (e: Event)=>{
    e.preventDefault()
    if(formValidation()){
        await AuthService.singIn(user)
            .then(async (response)=>{
                localStorage.setItem('chatAppToken', response.token);
                toast.add({ severity: 'success', summary: 'Connexion réussie', life: 10000 });
                await useAuthStore()
                    .init()
                    .then(()=> useAuthStore().redirect() )
            })
            .catch((error)=>{
                localStorage.removeItem('chatAppToken');
                toast.add({ severity: 'error', summary: 'Connexion echouée', detail: 'Erreur du serveur, veuillez réesayer' , life: 10000 });
            })
    }
}
</script>

<style src="./style.css"></style>