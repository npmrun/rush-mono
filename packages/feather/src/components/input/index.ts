import component from './input.vue'
import './style/input.scss'
import { withInstall } from '@/hooks'

const FeInput = withInstall('input', component)

export { FeInput }
export default FeInput
