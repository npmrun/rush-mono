import DefaultTheme from 'vitepress/theme'
import './style.css'
/**
 * 
1.注意这里因为是软链接，因此需要在feather-ui的package.json中添加以下依赖使其能够找到依赖位置
"devDependencies": {
    "feather-ui": "."
}
2.或者在根目录添加依赖也行，采用这种方法
 */
import FUI from 'feather-ui/dist/components/dialog'
import CUI from 'cloud-ui/dist/components/dialog'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        console.log('222')
        console.log(FUI)
        // console.log(4343)
        app.use(FUI)
        app.use(CUI)
    },
}
