import 'virtual:windi.css'
import 'virtual:windi-devtools'

import CodeEditor from '@';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(CodeEditor)
app.mount('#app')
