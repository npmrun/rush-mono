import FeMask from './mask.vue'
import { App } from 'vue'
import '@/style/mask/index.css'

FeMask.name = 'fe-mask'
FeMask.install = function(app: App, options: any) {
    app.component('fe-mask', FeMask)
}

export { FeMask }

export default FeMask
