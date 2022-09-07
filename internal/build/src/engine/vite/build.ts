import { build as viteBuild, createServer, resolveConfig } from 'vite'
import _ from 'lodash'
import vue3Config from './vue3.config'

export default function () {
    viteBuild(vue3Config(false))
}
