import { watch } from 'rollup'
import _ from 'lodash'
import cliConfig from './cli.config'
import chalk from 'chalk';

export default function() {
    console.log(chalk.red("开始监听"));
    watch({
        ...cliConfig(true),
        watch: {}
    })
}
