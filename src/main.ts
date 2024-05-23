import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//PRIMEVUE
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import ToastService from 'primevue/toastservice';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';

app.use(PrimeVue)
app.use(ToastService)
app.component("FloatLabel", FloatLabel)
app.component("InputText", InputText)
app.component('Button', Button)
app.component('Card', Card)

app.use(createPinia())
app.use(router)

app.mount('#app')