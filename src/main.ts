import './assets/main.css'
import '/node_modules/primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import Calendar from 'primevue/calendar'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(createPinia())
app.use(router)

app.component('Calendar', Calendar)
app.component('MultiSelect', MultiSelect)
app.component('Button', Button)
app.component('RadioButton', RadioButton)

app.mount('#app')
