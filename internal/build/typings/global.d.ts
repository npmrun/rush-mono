interface IBuildInfo {
    engine: 'vite' | 'unbuild' | 'rollup'
    mode: 'components' | 'cli' | 'component' | 'test' | 'module'
    componentsName: string
    componentsDir: string
    componentsOutDir: string
    componentsPrefix: string
    componentsPkgPrefix: string
    fileName: string
    name: string
    outDir: string
    entry: string

    varname?:string
    filename?:string
    format?:string[]
    watch?:string
}
