import { defineBuildConfig, BuildConfig } from 'unbuild'
import _ from 'lodash'
import { buildInfo, externals, dependencies, devDependencies, peerDependencies } from "./parse"

export default (NODE_ENV: string) => {
    const isDev = NODE_ENV === 'development'
    const isProd = NODE_ENV === 'production'
    
    return [
        process.cwd(),
        false,
        defineBuildConfig({
            hooks: {
                'rollup:options'(ctx, options) {
                    if (
                        options.output &&
                        Array.isArray(options.output) &&
                        options.output.length
                    ) {
                        options.output = options.output.filter(
                            (v) => v.format !== 'cjs'
                        )
                        options.output[0].entryFileNames = '[name].js'
                        const one = _.cloneDeep(options.output[0])
                        one.entryFileNames = '[name].umd.js'
                        one.format = 'umd'
                        one.name = buildInfo.name
                        options.output.push(one)
                    }
                },
            },
            declaration: true,
            dependencies: dependencies,
            devDependencies: devDependencies,
            peerDependencies: peerDependencies,
            externals: externals,
            entries: [
                {
                    name: buildInfo.name,
                    input: buildInfo.entry,
                    outDir: buildInfo.outDir,
                },
            ],
            rollup: {
                emitCJS: true,
                cjsBridge: true,
            },
        }),
    ] as [string, boolean, BuildConfig]
}
