import { App, Component } from 'vue'

function withInstall(name: string, comp: any) {
    comp.name = `fe-${name}`
    comp.install = function (app: App, options: any) {
        app.component(`fe-${name}`, comp)
    }
}

export {
    withInstall
}