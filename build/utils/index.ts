import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import { BuildConfig } from 'unbuild'
import { IBuildInfo } from '@build/global'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function getPackagesDir() {
    return path.resolve(__dirname, `../../packages`)
}

export function getPackage(name: string) {
    return path.resolve(__dirname, `../../packages/${name}`)
}
export function getPackagePkgInfo(name: string) {
    const packageName = getPackage(name)
    const pkgPath = path.resolve(packageName, './package.json')
    const pkgInfo = fs.readJSONSync(pkgPath)
    return pkgInfo
}
export function getPackageBuildInfo(name: string): IBuildInfo {
    const pkgInfo = getPackagePkgInfo(name)
    return pkgInfo['buildinfo'] ?? {}
}
export function getPackageEntery(name: string): string {
    const packageName = getPackage(name)
    const buildInfo = getPackageBuildInfo(name)
    return path.resolve(packageName, buildInfo.entry)
}
export function getPackageOutDir(name: string): string {
    const packageName = getPackage(name)
    const buildInfo = getPackageBuildInfo(name)
    return path.resolve(packageName, buildInfo.outDir)
}
