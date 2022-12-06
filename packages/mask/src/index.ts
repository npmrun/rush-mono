import RushMask from './mask.vue'
import { App } from 'vue'

RushMask.name = 'rush-mask'
RushMask.install = function (app: App, options: any) {
    app.component('rush-mask', RushMask)
}
export { RushMask }
export default RushMask
