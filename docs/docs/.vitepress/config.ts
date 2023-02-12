import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    lastUpdated: true,
    title: 'Rush-Mono',
    description: 'Build Anything',
    themeConfig: {
        siteTitle: 'Rush-Mono',
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()}-present NPMRUN`,
        },
        socialLinks: [
            // { icon: 'github', link: 'https://github.com/jd-solanki/anu' },
        ],
        nav: [
            {
                text: '指导', activeMatch: '/guide/',
                items: [
                    { text: '介绍', link: '/guide/introduction' },
                ]
            },
            { text: '命令行', link: '/command/introduction', activeMatch: '/command/' },
            {
                text: 'vue3组件与库',
                activeMatch: '/components/',
                items: [
                    { text: '介绍', link: '/components/introduction' },
                    { text: 'fullpage', link: '/components/fullpage/introduction' },
                ]
            },
            { text: '库', link: '/library/introduction', activeMatch: '/library/' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '导引',
                    items: [
                        { text: '介绍', link: '/guide/introduction' },
                        { text: '开始', link: '/guide/getting-started' },
                    ],
                },
                {
                    text: '支持的库',
                    items: [
                        { text: '命令行', link: '/guide/introduction' }
                    ],
                },
            ],
            '/library/': [
                {
                    text: 'Guide',
                    items: [
                        { text: 'Introduction', link: '/library/introduction' },
                    ],
                },
            ],
            '/components/': [
                {
                    text: '导引',
                    collapsible: true,
                    items: [
                        {
                            text: '介绍',
                            link: '/components/introduction',
                        },
                        {
                            text: 'fullpage',
                            link: '/components/fullpage/introduction',
                        }
                    ],
                },
            ],
        },
    },
    markdown: {
        // theme: 'dracula',
        config(md) {
            md.use(containerPreview)
            md.use(componentPreview)
        },
    },
    vite: {
        server: {
            fs: {
                allow: ["../../node_modules"]
            }
        }
    },
})