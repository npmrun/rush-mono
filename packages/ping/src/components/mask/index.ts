import mask from "./mask.vue"
import { App } from "vue"
import "./style.css"

mask.install = function(app: App, options: any) {
    app.component("ping-mask",  mask)
}

export default mask;