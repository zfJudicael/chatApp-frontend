<template>
    <div class="register">
        <form @submit.prevent="onSubmit">
            <h3>Création d'un nouveau compte</h3>

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
                <small id="email-help">L'adresse e-mail est utilisée lors de la connexion à votre compte</small>
            </div>

            <div class="input">
                <label for="pseudo">Pseudo :</label>
                <InputText id="pseudo" v-model="user.pseudo"
                    placeholder="Prenoms / Pseudonyme..."
                    autocomplete="false"
                    aria-describedby="pseudo-help"
                    :invalid="errorPseudo"
                />
                <InlineMessage class="inlineMessage" v-if="errorPseudo">{{ pseudoErrorMessage }}</InlineMessage>
                <small id="pseudo-help">Choisissez votre indentifiant.</small>
            </div>

            <div class="input">
                <label for="firstPassword">Mots de passe :</label>
                <Password input-id="firstPassword" v-model.trim="user.password"
                    toggleMask 
                    :feedback="false"  
                    placeholder="Premier essaie"
                    class="password" 
                    :invalid="errorPassword" 
                />
                <InlineMessage class="inlineMessage" v-if="errorPassword">{{ passwordErrorMessage }}</InlineMessage>
            </div>

            <div class="input">
                <label for="secondPassword">Confirmer mots de passe :</label>
                <Password  input-id="secondPassword" v-model.trim="passwordConfirm"
                    toggleMask 
                    :feedback="false"  
                    placeholder="Ecrivez à nouveau"  
                    class="password"
                    :invalid="errorPasswordConfirm"
                    :disabled="isPasswordEmpty"
                />
                <InlineMessage class="inlineMessage" v-if="errorPasswordConfirm">{{ passwordConfirmErrorMessage }}</InlineMessage>
            </div>

            <hr>

            <div v-if="!isResponseEmpty">{{ message }}</div>
            <div class="button">
                <Button type="submit" label="Confirmer" severity="info" class="confirmer"/>
                <Button label="Annuler" type="button" severity="info" text class="cancel"/>
            </div>
            <small class="question">Vous avez déja un compte?<RouterLink :to="{name : 'login'}">Connectez vous</RouterLink> </small>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import AuthService from '@/services/auth.services';
import type { IUser } from '@/models/user.model';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InlineMessage from 'primevue/inlinemessage';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { RouterLink, useRouter } from 'vue-router';
import useValidateEmail from '@/composables/validateEmail'

const router = useRouter()
const user = reactive<IUser>({
    pseudo: '',
    password: '',
})
const passwordConfirm = ref('')
const toast = useToast();

const isResponseEmpty = ref(true)
const message = ref<string>('')

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

const errorPseudo = ref(false)
const pseudoErrorMessage = ref('')
const handlePseudo = ()=>{
    let isValid = false;
    if(user.pseudo){
        errorPseudo.value = false
        isValid = true;
    }else{
        errorPseudo.value = true
        pseudoErrorMessage.value = 'Pseudo requise'
    }
    return isValid;
}

const errorPassword = ref(false)
const passwordErrorMessage = ref('')
const handlePassword = ()=>{
    let isValid = false;
    if(user.password){
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

const errorPasswordConfirm = ref(false)
const passwordConfirmErrorMessage = ref('')
const handlePasswordConfirm = ()=>{
    let isValid = false;
    if(passwordConfirm.value){
        if(user.password === passwordConfirm.value){
            errorPasswordConfirm.value = false
            isValid = true
        }else{
            errorPasswordConfirm.value = true
            passwordConfirmErrorMessage.value = 'Les deux valeurs ne sont pas identiques'
        }
    }else{
        errorPasswordConfirm.value = true
        passwordConfirmErrorMessage.value = 'Champ requis'
    }
    return isValid;
}

const isPasswordEmpty = ref(true)
watch(user ,(newValue)=>{
    if(newValue.password){
        isPasswordEmpty.value = false
        if(newValue.password.length < 5){
            errorPassword.value = true
            passwordErrorMessage.value = '5 caractères minimum'
        }else{
            errorPassword.value = false
        }
    }else{
        isPasswordEmpty.value = true   
        errorPasswordConfirm.value = false
        passwordConfirm.value = ''
    }
})

watch(passwordConfirm, (newValue)=>{
    if(user.password?.length != newValue.length){
        errorPasswordConfirm.value = true
        passwordConfirmErrorMessage.value = 'Nombre de caractères pas identiques'
    }else{
        errorPasswordConfirm.value = false
    }
})

const formValidation = ()=>{
    return (handleEmail() && handlePseudo() && handlePassword() && handlePasswordConfirm())
}

const onSubmit = async ()=>{
    if(formValidation()){
        isResponseEmpty.value = true
        try{
            await AuthService.signUp(user);
            toast.add({ severity: 'success', summary: 'Enregisterment effectué', detail: 'Compte créé avec succès', life: 10000 });
            setTimeout(()=>{
                router.push({name: 'login'})
            }, 1000)

        }catch(error: any){
            switch (error.response.data.message){
                case '"email" must be a valid email' :
                    errorEmail.value = true
                    emailErrorMessage.value = 'L\'adresse email n\'est pas valide '
                    break; 
                case 'EMAIL_ALREADY_PICKED' :
                    errorEmail.value = true
                    emailErrorMessage.value = 'L\'adresse email est déjà utilisé  '
                    break;
                case 'PSEUDO_ALREADY_PICKED' :
                    errorPseudo.value = true
                    pseudoErrorMessage.value = 'Ce pseudo est déjà prise'
                    break;
                default :
                    toast.add({ severity: 'error', summary: 'Enregisterment non effectué', detail: 'Erreur du serveur, veuillez réessayer', life: 10000 });
                    break;
            }
        }
    }
}   

</script>

<style src="./style.css"></style>