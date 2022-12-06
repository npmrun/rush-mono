import { defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import _ from 'lodash'
import libCss from './plugins/vite-plugin-libcss'
import { buildInfo, externals, globals } from '@/parse'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

export default (isDev: boolean, options?: any) => {
    const plugins = []
    if(isDev){
        plugins.push(WindiCSS({
            scan: {
                include: "example/**/*.vue"
            }
        }))
    }
    let watch: any = false
    if(options && options.watch){
        watch = {
            buildDelay: 0,
            clearScreen: true,
            include: 'src/**',
            skipWrite: false
        }
    }
    return {
        root: process.cwd(),
        logLevel: 'error',
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), './src')
            },
        },
        plugins: [vue({ isProduction: !isDev }), vueJsx(), dts({
            exclude: ["env.d.ts"]
        }), libCss(), ...plugins],
        build: {
            sourcemap: 'inline',
            outDir: buildInfo.outDir,
            cssCodeSplit: false,
            emptyOutDir: false,
            watch,
            lib: {
                entry: buildInfo.entry,
                name: buildInfo.name,
                fileName: buildInfo.fileName,
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
