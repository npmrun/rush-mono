import FUI from '@'
import { createApp } from 'vue'
import App from './App.vue'
console.log(FUI)

const app = createApp(App)
app.use(FUI)
app.mount('#app')
