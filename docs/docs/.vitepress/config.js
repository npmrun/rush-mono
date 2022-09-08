export default {
    lang: 'zh-CN',
    lastUpdated: true,
    title: 'Rush-Mono',
    description: 'Build Anything',
    themeConfig: {
        siteTitle: 'Rush-Mono',
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()}-present Dash`,
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/jd-solanki/anu' },
        ],
        nav: [
            { text: '指导', link: '/guide/introduction' },
            { text: '组件', link: '/components/introduction' },
            { text: '库', link: '/library/introduction' },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '导引',
                    items: [
                        { text: '介绍', link: '/guide/introduction' },
                        {
                            text: '开始',
                            link: '/guide/getting-started',
                        },
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
                    text: 'Guide',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: 'introduction',
                            link: '/components/introduction',
                        },
                    ],
                },
            ],
        },
    },
    markdown: {
        theme: 'dracula',
    },
    vite: {
        optimizeDeps: {
            include: ["feather-ui"]
        }
    },
}
