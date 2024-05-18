<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()

onMounted(()=>{

  authStore.init()
           .then(()=>{
            authStore.redirect()
           })
})
</script>
