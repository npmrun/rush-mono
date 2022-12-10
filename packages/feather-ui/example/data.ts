import { Component } from 'vue'

type One = {
    name: string
    component: Component
    demos: Record<string, Component>
    zh: Component
    en: Component
}

const components: One[] = []
const mdData = import.meta.globEager('../src/components/*/index.*.md')
const demoData = import.meta.globEager('../src/components/*/demo/*.vue')
const componentsData = import.meta.globEager('../src/components/*/index.ts')
for (const key in componentsData) {
    const mod = componentsData[key].default || componentsData[key]
    const name = /src\/components\/(.*?)\//.exec(key)![1]
    const demos: Record<string, Component> = {}
    for (const key in demoData) {
        if (key.startsWith(`../src/components/${name}/demo`)) {
            const demoName = /\/demo\/(.*?)\.vue$/.exec(key)![1]
            const demoModule = demoData[key].default || demoData[key]
            demoModule.name = demoName
            demos[demoName] = demoModule
        }
    }
    const zhMD =
        mdData[`../src/components/${name}/index.zh-CN.md`]?.['VueComponent']
    const enMD =
        mdData[`../src/components/${name}/index.en-US.md`]?.['VueComponent']

    components.push({
        name: name,
        component: mod,
        demos: demos,
        zh: zhMD,
        en: enMD,
    })
}

export { components }
