import { defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import _ from 'lodash'
import libCss from './plugins/vite-plugin-libcss'
import { buildInfo, externals, globals } from '@/parse'
import path from 'path'

export default (isDev: boolean) => {
    return {
        root: process.cwd(),
        logLevel: 'error',
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), './src'),
            },
        },
        plugins: [vue({ isProduction: !isDev }), vueJsx(), dts(), libCss()],
        build: {
            sourcemap: 'inline',
            outDir: buildInfo.outDir,
            cssCodeSplit: false,
            emptyOutDir: false,
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
