import { App } from "vue"
import RushTree from "./tree.vue"
import "./style.scss"

export * from "./util"
export * from "./type"

RushTree.name = 'rush-tree'
RushTree.install = function (app: App, options: any) {
    app.component('rush-tree', RushTree)
}

export {
    RushTree
}
export default RushTree
