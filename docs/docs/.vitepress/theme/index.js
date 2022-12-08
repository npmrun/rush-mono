import DefaultTheme from 'vitepress/theme'
import DemoPreview from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import './style.css'
/**
 * 
1.注意这里因为是软链接，因此需要在feather-ui的package.json中添加以下依赖使其能够找到依赖位置，采用这种方法
"devDependencies": {
    "feather-ui": "workspace:*"
}
2.或者在根目录添加依赖也行
 */
import FUI from 'feather-ui'
import 'feather-ui/dist/style.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.use(FUI)
        app.use(DemoPreview)
    },
}
