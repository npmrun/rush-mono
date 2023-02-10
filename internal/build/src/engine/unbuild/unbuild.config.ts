import { defineBuildConfig } from 'unbuild'
import _ from 'lodash'
import {
    buildInfo,
    externals,
    dependencies,
    devDependencies,
    peerDependencies,
} from '@/parse'

export default (isDev: boolean) => {
    return defineBuildConfig({
        hooks: {
            'rollup:options'(ctx, options) {
                if (
                    options.output &&
                    Array.isArray(options.output) &&
                    options.output.length
                ) {
                    const one = _.cloneDeep(options.output[0])
                    one.entryFileNames = '[name].umd.js'
                    one.format = 'umd'
                    one.name = buildInfo.varname ?? buildInfo.filename
                    options.output.push(one)
                }
            },
        },
        stub: isDev, // stub模式适合nodejs，不适合浏览器，考虑换成vite或者rollup
        declaration: true,
        dependencies: dependencies,
        devDependencies: devDependencies,
        peerDependencies: peerDependencies,
        externals: externals,
        entries: [
            {
                name: buildInfo.filename,
                input: buildInfo.entry,
                outDir: buildInfo.outDir
            },
        ],
        rollup: {
            emitCJS: true,
            cjsBridge: true,
        },
    })
}
