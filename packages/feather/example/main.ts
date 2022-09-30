import FUI from '@/index'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(FUI)
app.mount('#app')
