import FeMask from './mask.vue'
import { App } from 'vue'
import '@/style/mask/index.css'

FeMask.name = 'cd-mask'
FeMask.install = function(app: App, options: any) {
    app.component('cd-mask', FeMask)
}

export { FeMask }

export default FeMask
