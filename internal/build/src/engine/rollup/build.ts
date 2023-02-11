import { OutputOptions, rollup, RollupOptions } from 'rollup'
import _ from 'lodash'
import cliConfig from './cli.config'
import moduleConfig from './module.config'
import testConfig from './test.config'
import chalk from 'chalk'
import { buildInfo } from '@/parse'

export default async function () {
    console.log(chalk.green('开始构建'))
    let config: RollupOptions = {}
    if (buildInfo.mode === 'test') {
        config = testConfig(false)
    }
    if (buildInfo.mode === 'cli') {
        config = cliConfig(false)
    }
    if (buildInfo.mode === "module") {
        config = moduleConfig(false)
    } else {
        console.warn("未匹配到任何模式")
    }
    const bundle = await rollup(config)
    if (!config.output) return
    if (Array.isArray(config.output)) {
        for (let i = 0; i < config.output.length; i++) {
            const c = config.output[i]
            await bundle.write(c)
        }
    } else {
        await bundle.write(config.output)
    }
}
