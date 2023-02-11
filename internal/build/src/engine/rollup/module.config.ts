import { defineConfig } from "rollup"
import path from "path"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import alias from "@rollup/plugin-alias"
import replace from "@rollup/plugin-replace"
import terser from '@rollup/plugin-terser'
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import { buildInfo, externals, globals } from '@/parse'
import exportOutput from "./exportOutput"

import scss from "rollup-plugin-scss"
//@ts-ignore
import bundleScss from "rollup-plugin-bundle-scss"

export default (isDev: boolean) => {

    function resolvePath(...argu: string[]) {
        return path.join(process.cwd(), ...argu)
    }

    const inputPlugins: any[] = [peerDepsExternal()]
    const outputPlugins: any[] = []
    if (!isDev) {
        outputPlugins.push(terser())
    }

    const tsPlugin = typescript({
        check: !isDev,
        tsconfig: resolvePath("tsconfig.json"),
        cacheRoot: resolvePath("node_modules/.rts2_cache"),
        tsconfigOverride: {
            compilerOptions: {
                declaration: !isDev,
                sourceMap: true,
            },
        },
    })

    const aliasPlugin = alias({
        // entries: {"@": path.resolve(__dirname, "src")}
    })
    const replacePlugin = replace({
        preventAssignment: true,
        __DEV__: isDev,
    })
    inputPlugins.push((bundleScss.default ?? bundleScss)({ output: `${buildInfo.filename}.scss`, exclusive: false }))
    inputPlugins.push(
        scss({
            watch: resolvePath("src/style"),
            outputStyle: !isDev ? "compressed" : '',
        }),
    )
    inputPlugins.push({
        name: "my-md",
        transform(code: string, id: string) {
            if (id.endsWith(".md")) {
                return {
                    code: `export default ${JSON.stringify(code.toString())}`,
                    map: { mappings: '' }
                }
            }
            return null
        }
    })
    inputPlugins.push(commonjs())
    inputPlugins.push(aliasPlugin)
    inputPlugins.push(replacePlugin)
    inputPlugins.push(tsPlugin)
    return defineConfig({
        input: buildInfo.entry,
        external: externals,
        output: exportOutput(globals, isDev),
        plugins: inputPlugins,
    })
}