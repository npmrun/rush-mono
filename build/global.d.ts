import type { BuildConfig } from "unbuild"
import type { InlineConfig } from 'vite'

interface IBuildInfo {
    engine: 'unbuild' | 'vite'
    entry: string
    formatName: string
    outDir: string
}