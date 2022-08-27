import {
    getPackage,
    getPackageBuildInfo,
    getPackagePkgInfo,
    getPackagesDir,
} from '@build/utils'
import runBuild from './run/unbuild'
import glob from 'fast-glob'
import { IBuildInfo } from '@build/global'

const dirs = glob.sync('**/*/package.json', {
    cwd: getPackagesDir(),
    deep: 2,
})

for (let i = 0; i < dirs.length; i++) {
    const pkg = dirs[i]
    const [name] = pkg.split('/')
    const pkgInfo = getPackagePkgInfo(name)
    const buildInfo: IBuildInfo = pkgInfo['buildinfo'] ?? {}

    if (buildInfo['engine'] === 'unbuild' && !pkgInfo.private) {
        console.log(`开始构建: ${name}`)
        await runBuild(name, pkgInfo)
        console.log(`构建完成: ${name}`)
    }
}
