import 'virtual:windi.css'
import 'virtual:windi-devtools'

import FUI from '@/index'
import "github-markdown-css"
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(FUI)
app.mount('#app')
