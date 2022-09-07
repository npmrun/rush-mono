import { OutputOptions, rollup } from 'rollup'
import _ from 'lodash'
import cliConfig from './cli.config'

export default async function() {
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
