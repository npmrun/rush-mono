interface IBuildInfo {
    engine: 'vite' | 'unbuild' | 'rollup'
    mode: 'components' | 'cli' | 'component' | 'test'
    componentsDir: string
    componentsOutDir: string
    componentsPrefix: string
    componentsPkgPrefix: string
    fileName: string
    name: string
    outDir: string
    entry: string
}
