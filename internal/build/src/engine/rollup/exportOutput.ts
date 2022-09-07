import path from 'path'
import { ModuleFormat, OutputOptions } from 'rollup'
import { buildInfo } from '../parse'
import { terser } from 'rollup-plugin-terser'

const outputPlugins: any[] = []

type filetype = 'es' | 'umd' | 'cjs'

export default function exportOutput(isDev: boolean, globals: any) {
    let output: any = []
    if (isDev && buildInfo.watch) {
        output = getFileType(buildInfo.watch as any)
    } else {
        output = getFileType(buildInfo.format as any)
    }

    let result: OutputOptions[] = []
    if (output) {
        result = output.map((v: any) => {
            return {
                sourcemap: false,
                globals: globals,
                exports: 'auto',
                externalLiveBindings: false,
                plugins: [
                    ...outputPlugins,
                    ...(v.file.includes('.min') ? [terser()] : []),
                ],
                ...v,
            }
        })
    }
    return result
}

function getFileType(type: filetype | filetype[]) {
    // const outputObject: Record<filetype, any[]> = Object.create(null)
    function createOutput(type: filetype, name: string) {
        if (type === 'es') {
            return [
                {
                    sourcemap: false,
                    file: path.join(buildInfo.outDir, `${name}.es.mjs`),
                    format: 'es',
                    banner: buildInfo?.cjsBin ? '#!/usr/bin/env node' : '',
                },
                {
                    sourcemap: true,
                    file: path.join(buildInfo.outDir, `${name}.es.min.mjs`),
                    format: 'es',
                    banner: buildInfo?.cjsBin ? '#!/usr/bin/env node' : '',
                },
            ]
        }
        if (type === 'cjs') {
            return [
                {
                    sourcemap: false,
                    file: path.join(buildInfo.outDir, `${name}.cjs.js`),
                    format: 'cjs',
                    banner: buildInfo?.cjsBin ? '#!/usr/bin/env node' : '',
                },
                {
                    sourcemap: true,
                    file: path.join(buildInfo.outDir, `${name}.cjs.min.js`),
                    format: 'cjs',
                    banner: buildInfo?.cjsBin ? '#!/usr/bin/env node' : '',
                },
            ]
        }
        if (type === 'umd') {
            return [
                {
                    sourcemap: false,
                    file: path.join(buildInfo.outDir, `${name}.umd.js`),
                    name: buildInfo.name,
                    format: 'umd',
                },
                {
                    sourcemap: true,
                    file: path.join(buildInfo.outDir, `${name}.umd.min.js`),
                    name: buildInfo.name,
                    format: 'umd',
                },
            ]
        }
        return []
    }
    if (Array.isArray(type)) {
        return type.reduce(
            (a, b) => a.concat(createOutput(b, buildInfo.name) as any),
            []
        )
    } else {
        return createOutput(type, buildInfo.name)
    }
}
