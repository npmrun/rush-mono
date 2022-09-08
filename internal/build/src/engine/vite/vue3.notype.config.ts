import { defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import _ from 'lodash'
import libCss from './plugins/vite-plugin-libcss'
import { buildInfo, externals, globals } from '@/parse'
import path from 'path'

export default (
    isDev: boolean,
    opts: {
        entry: string
        name: string
        oname: string
        outDir: string
    }
) => {
    return {
        root: process.cwd(),
        logLevel: 'error',
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), './src'),
            },
        },
        plugins: [vue({ isProduction: !isDev }), vueJsx(), libCss()],
        build: {
            sourcemap: 'inline',
            outDir: opts.outDir,
            cssCodeSplit: false,
            emptyOutDir: false,
            lib: {
                entry: opts.entry,
                name: opts.name,
                fileName: (format) => `index${format == 'es' ? '.m' : '.umd.'}js`,
                formats: ['es', 'umd'],
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
                    exports: 'named',
                },
            },
        },
    } as InlineConfig
}
