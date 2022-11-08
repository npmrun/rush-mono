import component from './button.vue'
import './style/button.scss'
import { withInstall } from '@/hooks'

const FeButton = withInstall('button', component)

export { FeButton }
export default FeButton
