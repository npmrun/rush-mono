import { defineBuildConfig } from 'unbuild'
import _ from 'lodash'
import {
    buildInfo,
    externals,
    dependencies,
    devDependencies,
    peerDependencies,
} from '@/parse'
import { resolve } from 'path'

export default (isDev: boolean) => {
    return defineBuildConfig({
        hooks: {
            'rollup:options'(ctx, options) {
                // // https://github.com/unjs/unbuild/issues/112#issuecomment-1331769536
                // if (Array.isArray(options.plugins)) {
                //     // find the esbuild plugin instance
                //     const esbuildPlugin = options.plugins.find((p) => (p as any).name === 'esbuild');
                //     // renderChunk is where the minification happens
                //     // but we don't want it to be executed
                //     // on the TS declaration build 
                //     (esbuildPlugin as any).renderChunk = () => null
                // }
                const getChunkFilename = (chunkInfo: any, ext: string) => {
                    if (chunkInfo.isDynamicEntry) {
                        return `chunks/[name].${ext}`;
                    }
                    // TODO: Find a way to generate human friendly hash for short groups
                    return `shared/${ctx.options.name}.[hash].${ext}`;
                }
                if (
                    options.output &&
                    Array.isArray(options.output) &&
                    options.output.length
                ) {
                    options.output.push({
                        dir: resolve(ctx.options.rootDir, ctx.options.outDir),
                        entryFileNames: "[name].umd.js",
                        name: buildInfo.varname ?? buildInfo.filename,
                        chunkFileNames: (chunkInfo: any) => {
                            return getChunkFilename(chunkInfo, "umd.js")
                        },
                        format: "umd",
                        exports: "auto",
                        generatedCode: { constBindings: true },
                        externalLiveBindings: false,
                        freeze: false,
                    })
                    
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
            esbuild: {
                minify: !isDev
            },
            emitCJS: true,
            cjsBridge: true,
        },
    })
}
