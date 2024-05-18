import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//PRIMEVUE
import 'primevue/resources/themes/aura-light-green/theme.css'

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Card from 'primevue/card';

app.use(PrimeVue)
app.component("FloatLabel", FloatLabel)
app.component("InputText", InputText)
app.component('Button', Button)
app.component('Password', Password)
app.component('Card', Card)

app.use(createPinia())
app.use(router)

app.mount('#app')