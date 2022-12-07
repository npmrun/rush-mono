import RushAdjustLine from './adjust-line.vue'
import { App } from 'vue'

RushAdjustLine.name = 'rush-adjust-line'
RushAdjustLine.install = function (app: App, options: any) {
    app.component('rush-adjust-line', RushAdjustLine)
}
export { RushAdjustLine }
export default RushAdjustLine
 