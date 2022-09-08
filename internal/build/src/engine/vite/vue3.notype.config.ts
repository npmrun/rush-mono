import { defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import _ from 'lodash'
import libCss from './plugins/vite-plugin-libcss'
import { externals, globals } from '@/parse'
import path from 'path'

export default (
    isDev: boolean,
    opts: {
        entry: string
        name: string
        fileName: string
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
                fileName: opts.fileName,
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
