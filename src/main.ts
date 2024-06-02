import './assets/style.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

//PRIMEVUE
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip'

app.use(PrimeVue)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.use(createPinia())
app.use(router)

app.mount('#app')