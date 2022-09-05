import type { BuildConfig } from "unbuild"

interface IBuildInfo {
    engine: 'unbuild' | 'vite'
    entry: string
    formatName: string
    outDir: string
    unbuildConfig?: BuildConfig
}