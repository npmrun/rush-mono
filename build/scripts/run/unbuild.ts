import { defineBuildConfig, build } from 'unbuild'
import {
    getPackage,
    getPackageEntery,
    getPackageOutDir,
} from '@build/utils'
import { IBuildInfo } from '@build/global'

export default async function(name: string, pkgInfo: any) {
    const buildInfo: IBuildInfo = pkgInfo['buildinfo'] ?? {}
    await build(
        getPackage(name),
        buildInfo.isDev,
        defineBuildConfig({
            declaration: true,
            dependencies: pkgInfo['dependencies'] ?? {},
            devDependencies: pkgInfo['devDependencies'] ?? {},
            peerDependencies: pkgInfo['peerDependencies'] ?? {},
            entries: [
                {
                    name: buildInfo.formatName,
                    input: getPackageEntery(name),
                    outDir: getPackageOutDir(name),
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
