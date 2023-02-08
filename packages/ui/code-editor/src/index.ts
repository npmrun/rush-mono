import RushCodeEditor from './code-editor.vue'
import { App } from 'vue'

RushCodeEditor.name = 'CodeEditor'
RushCodeEditor.install = function (app: App, options: any) {
    app.component('CodeEditor', RushCodeEditor)
}
export { RushCodeEditor }
export default RushCodeEditor
