import { defineBuildConfig, build } from 'unbuild'
import { getPackage, getPackageEntery, getPackageOutDir } from '@build/utils'
import { IBuildInfo } from '@build/global'
import path from 'path'

export default async function(name: string, pkgInfo: any) {
    const buildInfo: IBuildInfo = pkgInfo['buildinfo'] ?? {}
    const dependencies = pkgInfo['dependencies'] ?? {}
    const devDependencies = pkgInfo['devDependencies'] ?? {}
    const peerDependencies = pkgInfo['peerDependencies'] ?? {}
    const externals = [
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
        ...Object.keys(peerDependencies),
    ]
    await build(
        process.cwd(),
        false,
        defineBuildConfig({
            declaration: true,
            dependencies: dependencies,
            devDependencies: devDependencies,
            peerDependencies: peerDependencies,
            externals: externals,
            entries: [
                {
                    name: buildInfo.formatName,
                    input: buildInfo.entry,
                    outDir: buildInfo.outDir,
                },
            ],
            rollup: {
                emitCJS: true,
                cjsBridge: true,
            },
            ...buildInfo.unbuildConfig,
        })
    )
}
