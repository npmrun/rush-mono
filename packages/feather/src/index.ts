export * from './hooks'

export * from './components'

import * as componets from './components'
import type { App, Component } from 'vue'

function install(app: App) {
    for (const key in componets) {
        const component = (componets as Record<string, Component>)[key]
        // @ts-ignore
        const name = component.name || 'fe-' + key
        app.component(name, component)
    }
}

export { install }
export default {
    install,
}
