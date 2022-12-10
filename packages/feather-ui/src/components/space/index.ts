import FeSpace from './space'
import { App } from 'vue'

FeSpace.name = 'fe-space'
FeSpace.install = function (app: App, options: any) {
    app.component('fe-space', FeSpace)
}
export { FeSpace }
export default FeSpace
