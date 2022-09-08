import { applyPlugins } from '@ruabick/md-demo-plugins'

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
            {
                text: 'Dropdown Menu',
                items: [
                    { text: 'Item A', link: '/item-1' },
                    { text: 'Item B', link: '/item-2' },
                    { text: 'Item C', link: '/item-3' },
                ],
            },
            {
                text: 'Dropdown Menu',
                items: [
                    {
                        // Title for the section.
                        text: 'Section A Title',
                        items: [
                            { text: 'Section A Item A', link: '...' },
                            { text: 'Section B Item B', link: '...' },
                        ],
                    },
                ],
            },
            {
                text: 'Dropdown Menu',
                items: [
                    {
                        // You may also omit the title.
                        items: [
                            { text: 'Section A Item A', link: '...' },
                            { text: 'Section B Item B', link: '...' },
                        ],
                    },
                ],
            },
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
        config: (md) => {
            applyPlugins(md)
        },
    },
    vite: {},
}
