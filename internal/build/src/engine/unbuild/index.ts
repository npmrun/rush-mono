import { build as unbuildBuild } from 'unbuild'
import _ from 'lodash'
import unbuildConfig from './unbuild.config'

export default (isDev: boolean) => {
    return unbuildBuild(process.cwd(), isDev, unbuildConfig(isDev))
}
