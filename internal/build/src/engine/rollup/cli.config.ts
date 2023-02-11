import { defineConfig, OutputOptions, RollupOptions } from 'rollup'
import { buildInfo, externals, globals } from '@/parse'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

function resolvePath(...argu: string[]) {
    return path.resolve(process.cwd(), ...argu)
}

const inputPlugins: any[] = [peerDepsExternal()]

export default (isDev: boolean) => {
    const tsPlugin = typescript({
        check: !isDev,
        tsconfig: resolvePath('tsconfig.json'),
        cacheRoot: resolvePath('node_modules/.rts2_cache'),
        tsconfigOverride: {
            compilerOptions: {
                declaration: !isDev,
                declarationDir: 'dist',
                sourceMap: !isDev,
            },
        },
    })

    const aliasPlugin = alias({})
    const replacePlugin = replace({
        preventAssignment: true,
        values: {
            __DEV__: `${isDev}`,
        },
    })
    inputPlugins.push(nodeResolve())
    inputPlugins.push(commonjs())
    inputPlugins.push(aliasPlugin)
    inputPlugins.push(replacePlugin)
    inputPlugins.push(tsPlugin)

    let output: OutputOptions[] | OutputOptions = [
        {
            sourcemap: false,
            file: path.join(buildInfo.outDir, `${buildInfo.name}.es.mjs`),
            format: 'es',
            exports: 'auto',
            externalLiveBindings: false,
            globals: globals,
            banner: '#!/usr/bin/env node',
        },
        {
            sourcemap: true,
            file: path.join(buildInfo.outDir, `${buildInfo.name}.es.min.mjs`),
            format: 'es',
            exports: 'auto',
            externalLiveBindings: false,
            globals: globals,
            plugins: [terser()],
            banner: '#!/usr/bin/env node',
        },
    ]
    if (!isDev) {
        output = output[0]
    }
    return defineConfig({
        input: buildInfo.entry,
        external: externals,
        output: output,
        plugins: inputPlugins,
    })
}
