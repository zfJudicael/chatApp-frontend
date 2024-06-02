<template>
  <RouterView />
  <Toast position="bottom-center"/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store';
import Toast from 'primevue/toast';


onMounted(async ()=>{
  useAuthStore()
    .init()
    .then(()=>{
      useAuthStore().redirect()
    })
})
</script>
