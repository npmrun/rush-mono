import 'virtual:windi.css'
import 'virtual:windi-devtools'

import FUI from '@/index'
import 'github-markdown-css'
import { createApp } from 'vue'
import App from './App.vue'

import Page from './page.vue'
import { components } from './data'
import * as VueRouter from 'vue-router'

let name = Object.keys(components[0].demos)[0]
const routes: VueRouter.RouteRecordRaw[] = [
    { path: '/', redirect: '/zh/' + components[0].name + '/' + name },
    { path: '/:language/:comp/:demo(.*)?', component: Page },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const app = createApp(App)
app.use(FUI)
app.use(router)
app.mount('#app')
