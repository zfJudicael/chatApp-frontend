<template>
  <RouterView />
  <Toast position="bottom-center"/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store';
import Toast from 'primevue/toast';

const authStore = useAuthStore()

onMounted(()=>{

  authStore.init()
           .then(()=>{
            authStore.redirect()
           })
})
</script>
