import component from './button.vue'
import './style/index.scss'
import { withInstall } from '@/hooks'

withInstall('button', component)

export { component as FeButton }
export default component
