import {
    getPackage,
    getPackageBuildInfo,
    getPackageOutDir,
    getPackagePkgInfo,
    getPackagesDir,
} from '@build/utils'
import runBuild from './run/unbuild'
import runVite from './run/vite'
import glob from 'fast-glob'
import { IBuildInfo } from '@build/global'
import rimraf from 'rimraf'

const dirs = glob.sync('**/*/package.json', {
    cwd: getPackagesDir(),
    deep: 2,
})

for (let i = 0; i < dirs.length; i++) {
    const pkg = dirs[i]
    const [name] = pkg.split('/')
    const pkgInfo = getPackagePkgInfo(name)
    const buildInfo: IBuildInfo = pkgInfo['buildinfo'] ?? {}
    let oldCwd = process.cwd
    process.cwd = () => {
        return getPackage(name)
    }
    rimraf.sync(getPackageOutDir(name))
    if (buildInfo['engine'] === 'unbuild' && !pkgInfo.private) {
        console.log(`开始构建: ${name}`)
        await runBuild(name, pkgInfo)
        console.log(`构建完成: ${name}`)
    }
    if (buildInfo['engine'] === 'vite' && !pkgInfo.private) {
        console.log(`开始构建: ${name}`)
        await runVite(name, pkgInfo)
        console.log(`构建完成: ${name}`)
    }
    process.cwd = oldCwd
}
