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
import path from 'path'

let dirs = glob.sync('**/*/package.json', {
    cwd: getPackagesDir(),
    deep: 2,
})

let mod = await import(path.resolve(getPackagesDir(), "order.ts"))
mod = mod.default || mod;

const order = mod.order

console.log(`打包顺序：\n ${order.join("\n")}`);
console.log('\n');

dirs = dirs.filter((v)=>{
    const [name] = v.split('/')
    if(order.includes(name)) return false
    return true
})

for (let i = 0; i < order.length; i++) {
    const pkg = order[i]
    await buildMe(pkg)
}

async function buildMe(pkg: any) {
    const [name] = pkg.split('/')
    const pkgInfo = getPackagePkgInfo(name)
    const buildInfo: IBuildInfo = pkgInfo['buildinfo'] ?? {}
    let oldCwd = process.cwd
    process.cwd = () => {
        return getPackage(name)
    }
    rimraf.sync(getPackageOutDir(name))
    console.log('<==========>');
    console.log(`删除${name}输出目录`);
    if (buildInfo['engine'] === 'unbuild' && !pkgInfo.private) {
        console.log(`unbuild 开始构建: ${name}`)
        await runBuild(name, pkgInfo)
        console.log(`unbuild 构建完成: ${name}`)
    }
    if (buildInfo['engine'] === 'vite' && !pkgInfo.private) {
        console.log(`vite    开始构建: ${name}`)
        await runVite(name, pkgInfo)
        console.log(`vite    构建完成: ${name}`)
    }
    console.log('<==========>\n');
    process.cwd = oldCwd
}