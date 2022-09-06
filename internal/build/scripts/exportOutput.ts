import path from "path"
import { ModuleFormat, OutputOptions } from "rollup"
import pkg from "../package.json"
import { terser } from "rollup-plugin-terser"

let isProd = process.env.NODE_ENV === "production"
function resolvePath(...argu: string[]) {
    return path.resolve(__dirname, "../", ...argu)
}

const outputPlugins: any[] = []
if (isProd) {
}

type filetype = "es" | "umd" | "cjs"

export default function exportOutput(globals: any) {
    let output: any = []
    if(!isProd && pkg.buildOptions.watch){
        output = getFileType(pkg.buildOptions.watch as any)
    }else{
        output = getFileType(pkg.buildOptions.format as any)
    }

    let result: OutputOptions[] = []
    if (output) {
        result = output.map((v: any) => {
            return {
                sourcemap: false,
                globals: globals,
                exports: "auto",
                externalLiveBindings: false,
                plugins: [...outputPlugins, ...(v.file.includes(".min") ? [terser()] : [])],
                ...v,
            }
        })
    }
    return result
}

function getFileType(type: filetype | filetype[]) {
    // const outputObject: Record<filetype, any[]> = Object.create(null)
    function createOutput(type: filetype, name: string) {
        if (type === "es") {
            return [
                {
                    sourcemap: false,
                    file: resolvePath(`dist/${name}.es.mjs`),
                    format: "es",
                },
                {
                    sourcemap: true,
                    file: resolvePath(`dist/${name}.es.min.mjs`),
                    format: "es",
                },
            ]
        }
        if (type === "cjs") {
            return [
                {
                    sourcemap: false,
                    file: resolvePath(`dist/${name}.cjs.js`),
                    format: "cjs",
                    banner: pkg.buildOptions?.cjsBin ? "#!/usr/bin/env node" : "",
                },
                {
                    sourcemap: true,
                    file: resolvePath(`dist/${name}.cjs.min.js`),
                    format: "cjs",
                    banner: pkg.buildOptions?.cjsBin ? "#!/usr/bin/env node" : "",
                },
            ]
        }
        if (type === "umd") {
            return [
                {
                    sourcemap: false,
                    file: resolvePath(`dist/${name}.umd.js`),
                    name: pkg.buildOptions.var,
                    format: "umd",
                },
                {
                    sourcemap: true,
                    file: resolvePath(`dist/${name}.umd.min.js`),
                    name: pkg.buildOptions.var,
                    format: "umd",
                },
            ]
        }
        return []
    }
    if (Array.isArray(type)) {
        return type.reduce((a, b) => a.concat(createOutput(b, pkg.buildOptions.filename) as any), [])
    } else {
        return createOutput(type, pkg.buildOptions.filename)
    }
}