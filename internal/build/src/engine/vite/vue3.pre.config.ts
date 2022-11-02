import { defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import _ from 'lodash'
import { buildInfo, externals, globals } from '@/parse'
import path from 'path'
import dts from 'vite-plugin-dts'

export default (isDev: boolean) => {
    return {
        root: process.cwd(),
        logLevel: 'error',
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), './src'),
            },
        },
        plugins: [
            vue({ isProduction: !isDev }),
            vueJsx(),
            dts({ exclude: 'example', outputDir: buildInfo.outDir }) as any
        ],
        build: {
            sourcemap: 'inline',
            outDir: buildInfo.outDir,
            cssCodeSplit: true,
            emptyOutDir: false,
            lib: {
                entry: buildInfo.entry,
                fileName: () => `index.mjs`,
                formats: ['es'],
            },
            rollupOptions: {
                external: (id) => {
                    if (id.startsWith(buildInfo.componentsPkgPrefix)) {
                        return true
                    }
                    if (externals.includes(id)) {
                        return true
                    }
                    return false
                },
                output: {
                    preserveModules: true,
                    preserveModulesRoot: buildInfo.outDir,
                    assetFileNames(chunkInfo) {
                        return `${buildInfo.componentsName}/[name]/style/style.css`
                    },
                    globals: (id: string) => {
                        if (id.startsWith(buildInfo.componentsPkgPrefix)) {
                            const el = id.split('/')
                            return (
                                _.upperFirst(buildInfo.componentsPrefix) +
                                _.upperFirst(el[el.length - 1])
                            )
                        }
                        if (globals[id]) return globals[id]
                    },
                    exports: 'auto',
                },
            },
        },
    } as InlineConfig
}
