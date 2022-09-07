import { OutputOptions, rollup } from 'rollup'
import _ from 'lodash'
import cliConfig from './cli.config'
import chalk from 'chalk';

export default async function() {
    console.log(chalk.green("开始构建"));
    const config = cliConfig(false)
    const bundle = await rollup(config)
    if (!config.output) return
    if (Array.isArray(config.output)) {
        for (let i = 0; i < config.output.length; i++) {
            const c = config.output[i];
            await bundle.write(c)
        }
    } else {
        await bundle.write(config.output)
    }
}
