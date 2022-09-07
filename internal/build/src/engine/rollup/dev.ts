import { watch } from 'rollup'
import _ from 'lodash'
import cliConfig from './cli.config'

export default function() {
    watch(cliConfig(true))
}
