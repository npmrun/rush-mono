import { defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Mode, plugin as mdPlugin } from 'vite-plugin-markdown'
import dts from 'vite-plugin-dts'
import _ from 'lodash'
import libCss from './plugins/vite-plugin-libcss'
import { buildInfo, externals, globals } from '@/parse'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

export default (isDev: boolean) => {
    const plugins = []
    if(isDev){
        plugins.push(WindiCSS({
            scan: {
                include: "example/**/*.vue"
            }
        }))
    }
    return {
        root: process.cwd(),
        logLevel: 'error',
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), './src'),
                [buildInfo.componentsPkgPrefix]: path.resolve(
                    process.cwd(),
                    buildInfo.componentsDir
                ),
            },
        },
        // , dts({exclude: "example", outputDir: buildInfo.outDir})
        plugins: [mdPlugin({mode: [ Mode.VUE ]}), vue({ isProduction: !isDev }), vueJsx(), libCss(), ...plugins],
        build: {
            sourcemap: 'inline',
            outDir: buildInfo.outDir,
            cssCodeSplit: false,
            emptyOutDir: false,
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
