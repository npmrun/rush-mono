import path from 'path'
import fs from 'fs-extra'

const pkgInfo = fs.readJSONSync(path.resolve(process.cwd(), './package.json'))
const buildInfo = pkgInfo.buildinfo ?? {}
const dependencies = pkgInfo['dependencies'] ?? {}
const devDependencies = pkgInfo['devDependencies'] ?? {}
const peerDependencies = pkgInfo['peerDependencies'] ?? {}
pkgInfo.globals = pkgInfo['globals'] ?? {}
pkgInfo.exclude = pkgInfo['exclude'] ?? []

const externals = [
    ...Object.keys(dependencies),
    ...Object.keys(devDependencies),
    ...Object.keys(peerDependencies),
].filter((v) => !pkgInfo.exclude.includes(v))

let globals: Record<string, string> = {}
externals.forEach((v) => {
    globals[v] = pkgInfo.globals[v] || v
})

export { buildInfo, externals, globals, dependencies, devDependencies, peerDependencies }
