import { IBuildInfo } from '@build/global'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import dts from 'vite-plugin-dts'
import _ from 'lodash'
import { getPackageOutDir } from '@build/utils'

export default async function(name: string, pkgInfo: any) {
    const buildInfo: IBuildInfo = pkgInfo['buildinfo'] ?? {}
    const dependencies = pkgInfo['dependencies'] ?? {}
    const devDependencies = pkgInfo['devDependencies'] ?? {}
    const peerDependencies = pkgInfo['peerDependencies'] ?? {}
    const externals = [
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
        ...Object.keys(peerDependencies),
    ]
    let globals: Record<string, string> = {}
    externals.forEach((v) => {
        globals[v] = v
    })
    return build({
        logLevel: 'error',
        plugins: [
            vue({ isProduction: true }),
            vueJsx(),
            dts(),
        ],
        build: {
            outDir: buildInfo.outDir,
            cssCodeSplit: false,
            emptyOutDir: false,
            lib: {
                entry: buildInfo.entry,
                name: buildInfo.formatName,
                formats: ['es', 'umd'],
                fileName: (format) =>
                    `${name}${format == 'es' ? '' : '.umd'}.js`,
            },
            rollupOptions: {
                external: externals,
                output: {
                    globals: globals,
                },
            },
        },
        ...buildInfo.viteConfig
    })
}
