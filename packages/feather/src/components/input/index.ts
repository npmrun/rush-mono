import component from './input.vue'
import './style/input.scss'
import { withInstall } from '@/hooks'

withInstall('input', component)

export { component as FeInput }
export default component
