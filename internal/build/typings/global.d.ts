

interface IBuildInfo {
    engine: 'vite' | 'unbuild' | 'rollup'
    mode: 'components'
    name: string
    outDir: string
    entry: string
    watch: 'es' | 'umd'
    format: ('es' | 'umd')[]
}
