import dialog from './dialog.vue'
import { App } from 'vue'
import '@/style/dialog/index.css'

dialog.install = function(app: App, options: any) {
    app.component('ping-dialog', dialog)
}

export default dialog
