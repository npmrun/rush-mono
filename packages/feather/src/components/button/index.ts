import component from './button.vue'
import './style/button.scss'
import { withInstall } from '@/hooks'

withInstall('button', component)

export { component as FeButton }
export default component
