// import type {
//     ComponentResolver,
//     SideEffectsInfo,
// } from 'unplugin-vue-components/types'

// export default (): ComponentResolver => {
//     return {
//         type: 'component',
//         resolve: (componentName: string) => {
//             if (componentName.startsWith('Fe')) {
//                 let css: any[] = []
//                 const n = componentName.slice(2)
//                 css.push(
//                     (function getSideEffects(
//                         compName: string
//                     ): SideEffectsInfo {
//                         return `feather-ui/dist/components/${
//                             compName[0].toLowerCase() + compName.slice(1)
//                         }/style/style.css`
//                     })(n)
//                 )
//                 return {
//                     name: componentName,
//                     from: 'feather-ui',
//                     sideEffects: css,
//                 }
//             }
//         },
//     }
// }