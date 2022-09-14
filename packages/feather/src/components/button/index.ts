import FeButton from './button.vue'
import { App } from 'vue'
import '@/style/button/index.scss'

FeButton.name = 'fe-button'
FeButton.install = function (app: App, options: any) {
    app.component('fe-button', FeButton)
}
export { FeButton }
export default FeButton
