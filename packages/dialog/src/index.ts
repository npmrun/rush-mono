import RushDialog from './index.vue'
import { App } from 'vue'

RushDialog.name = 'rush-mask'
RushDialog.install = function (app: App, options: any) {
    app.component('rush-mask', RushDialog)
}
export { RushDialog }
export default RushDialog
