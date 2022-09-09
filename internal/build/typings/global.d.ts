interface IBuildInfo {
    engine: 'vite' | 'unbuild' | 'rollup'
    mode: 'components' | 'cli'
    componentsDir: string
    componentsOutDir: string
    componentsPrefix: string
    componentsPkgPrefix: string
    fileName: string
    name: string
    outDir: string
    entry: string
}