import path from "path"
import { ModuleFormat, OutputOptions } from "rollup"
import terser from "@rollup/plugin-terser"
import { buildInfo } from '@/parse'

function resolvePath(...argu: string[]) {
    return path.join(process.cwd(), buildInfo.outDir, ...argu)
}

const outputPlugins: any[] = []

type filetype = "es" | "umd" | "cjs"

export default function exportOutput(globals: any, isDev: boolean) {
    let output: any = []

    if (isDev) {
        output = getFileType(buildInfo.watch as any, isDev)
    } else {
        output = getFileType(buildInfo.format as any, isDev)
    }

    let result: OutputOptions[] = []
    if (output) {
        result = output.map((v: any) => {
            return {
                globals: globals,
                exports: "auto",
                generatedCode: { constBindings: true },
                externalLiveBindings: false,
                plugins: [...outputPlugins, ...(v.file.includes(".min") ? [terser()] : [])],
                ...v,
            }
        })
    }
    return result
}

function getFileType(type: filetype | filetype[], isDev: boolean) {
    function createOutput(type: filetype) {
        const res = []
        if (type === "es") {
            res.push(
                {
                    sourcemap: true,
                    file: resolvePath(`${buildInfo.filename}.es.mjs`),
                    format: "es",
                }
            )
            if (!isDev) {
                res.push(
                    {
                        sourcemap: true,
                        file: resolvePath(`${buildInfo.filename}.es.min.mjs`),
                        format: "es",
                    }
                )
            }
        }
        if (type === "cjs") {
            res.push(
                {
                    sourcemap: true,
                    file: resolvePath(`${buildInfo.filename}.cjs.js`),
                    format: "cjs",
                }
            )
            if (!isDev) {
                res.push(
                    {
                        sourcemap: true,
                        file: resolvePath(`${buildInfo.filename}.cjs.min.js`),
                        format: "cjs",
                    }
                )
            }
        }
        if (type === "umd") {
            res.push(
                {
                    sourcemap: true,
                    file: resolvePath(`${buildInfo.filename}.umd.js`),
                    name: buildInfo.varname,
                    format: "umd",
                }
            )
            if (!isDev) {
                res.push(
                    {
                        sourcemap: true,
                        file: resolvePath(`${buildInfo.filename}.umd.min.js`),
                        name: buildInfo.varname,
                        format: "umd",
                    }
                )
            }
        }
        return res
    }
    if (Array.isArray(type)) {
        return type.reduce((a, b) => a.concat(createOutput(b) as any), [])
    } else {
        return createOutput(type)
    }
}