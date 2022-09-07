import { defineConfig } from 'rollup'
import { buildInfo, externals, globals } from '../parse'
import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import exportOutput from './exportOutput'
import { nodeResolve } from '@rollup/plugin-node-resolve'

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

    const aliasPlugin = alias({
        // entries: {"@": path.resolve(__dirname, "src")}
    })
    const replacePlugin = replace({
        preventAssignment: true,
        values: {
            "__DEV__": `${isDev}`,
        }
    });
    // inputPlugins.push(bundleScss({ output: `${pkg.buildOptions.filename}.scss`, exclusive: false }))

    inputPlugins.push(nodeResolve())
    inputPlugins.push(commonjs())
    inputPlugins.push(aliasPlugin)
    inputPlugins.push(replacePlugin)
    inputPlugins.push(tsPlugin)

    return defineConfig({
        input: buildInfo.entry,
        external: externals,
        output: exportOutput(isDev, globals),
        plugins: inputPlugins,
    })
}
