import { RollupWatcher, watch } from 'rollup'
import _ from 'lodash'
import cliConfig from './cli.config'
import moduleConfig from './module.config'
import chalk from 'chalk';
import { buildInfo } from '@/parse';

export default function () {
    console.log(chalk.red("开始监听"));
    let watcher: RollupWatcher | undefined
    if (buildInfo.mode === "cli") {
        watcher = watch({
            ...cliConfig(true)
        })
    }else if (buildInfo.mode === "module") {
        watcher = watch({
            ...moduleConfig(true)
        })
    }else {
        console.warn("未匹配到任何模式")
    }
    if (watcher) {
        watcher.on('event', event => {
            switch (event.code) {
                case 'START':
                    console.info('Rebuilding...');
                    break;
                case 'BUNDLE_START':
                    console.info('Bundling...');
                    break;
                case 'BUNDLE_END':
                    console.info('Bundled!');
                    break;
                case 'END':
                    console.info('Done!');
                    break;
                case 'ERROR':
                    console.error("Rollup error: ", event);
            }
        });
    }
}
