import { build as viteBuild, createServer, resolveConfig } from 'vite'
import _ from 'lodash'
import vue3Config from './vue3.config'
import vue3NotypeConfig from './vue3.notype.config'
import vue3PreConfig from './vue3.pre.config'
import vue3Component from './vue3.component'
import { buildInfo } from '@/parse'
import FastGlob from 'fast-glob'
import path from 'path'
import rimraf from 'rimraf'

export default async function () {
    console.log(`清除输出文件夹`)
    rimraf.sync(buildInfo.outDir)
    if (buildInfo.mode === 'components' && buildInfo.componentsDir) {
        console.log(`检测到组件库`)
        console.log(`打包es组件库`)
        await viteBuild(vue3PreConfig(false))
        //----单个组件打包
        // for (let i = 0; i < components.length; i++) {
        //     const component = components[i]
        //     const name = component.split('/')[0]
        //     const opts = {
        //         entry: path.join('./' + buildInfo.componentsDir, component),
        //         name:
        //             _.upperFirst(buildInfo.componentsPrefix) +
        //             _.upperFirst(name),
        //         outDir: path.join('./' + buildInfo.componentsOutDir, name),
        //         oname: name,
        //     }
        //     console.log(`打包${name}组件`)
        //     await viteBuild(vue3NotypeConfig(false, opts))
        // }
        //----单个组件打包END
        console.log(`全量${buildInfo.name}组件库`)
        await viteBuild(vue3Config(false))
    }
    if (buildInfo.mode === 'component') {
        await viteBuild(vue3Component(false))
    }
    console.log(`打包完成`)
}
