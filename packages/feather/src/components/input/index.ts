import component from './input.vue'
import './style/index.scss'
import { withInstall } from '@/hooks'

withInstall('input', component)

export { component as FeInput }
export default component
