import type { BuildConfig } from "unbuild"

interface IBuildInfo {
    engine: 'unbuild'
    entry: string
    formatName: string
    isDev: boolean
    outDir: string
    unbuildConfig?: BuildConfig
}