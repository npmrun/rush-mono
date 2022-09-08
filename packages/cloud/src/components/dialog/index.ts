import FeDialog from './dialog.vue'
import { App } from 'vue'
import '@/style/dialog/index.css'

FeDialog.name = 'cd-dialog'
FeDialog.install = function(app: App, options: any) {
    app.component('cd-dialog', FeDialog)
}
export { FeDialog }
export default FeDialog
