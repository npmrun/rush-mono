import { defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import _ from 'lodash'
import { buildInfo, externals, globals } from "./parse"

export default (NODE_ENV: string) => {
    const isDev = NODE_ENV === 'development'
    const isProd = NODE_ENV === 'production'

    return {
        root: process.cwd(),
        logLevel: 'error',
        plugins: [vue({ isProduction: isProd }), vueJsx(), dts()],
        build: {
            sourcemap: 'inline',
            outDir: buildInfo.outDir,
            cssCodeSplit: false,
            emptyOutDir: true,
            lib: {
                entry: buildInfo.entry,
                name: buildInfo.name,
                formats: ['es', 'umd'],
            },
            rollupOptions: {
                external: externals,
                output: {
                    globals: globals,
                    exports: 'named',
                },
            },
        },
    } as InlineConfig
}
