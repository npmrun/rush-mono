import RushDialog from './index.vue'
import { App } from 'vue'

RushDialog.name = 'rush-dialog'
RushDialog.install = function (app: App, options: any) {
    app.component('rush-dialog', RushDialog)
}
export { RushDialog }
export default RushDialog
