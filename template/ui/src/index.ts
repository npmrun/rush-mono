import RushAdjustLine from './<%= uiName %>.vue'
import { App } from 'vue'

RushAdjustLine.name = '<%= fileName %>'
RushAdjustLine.install = function (app: App, options: any) {
    app.component('<%= fileName %>', RushAdjustLine)
}
export { RushAdjustLine }
export default RushAdjustLine
 