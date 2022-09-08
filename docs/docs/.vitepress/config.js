export default {
    lang: 'zh-CN',
    lastUpdated: true,
    title: 'VitePress11',
    description: 'Just playing around.',
    themeConfig: {
        siteTitle: 'My Custom Title',
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present JD Solanki',
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/jd-solanki/anu' },
        ],
        nav: [
            { text: '指导', link: '/guide/introduction' },
            { text: '组件库', link: '/components/introduction' },
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
                    text: 'Guide',
                    items: [
                        { text: 'Introduction', link: '/guide/introduction' },
                        {
                            text: 'Getting Started',
                            link: '/guide/getting-started',
                        },
                    ],
                },
            ],
            '/components/': [
                {
                    text: 'Guide',
                    collapsible: true,
                    items: [
                        // This shows `/guide/index.md` page.
                        {
                            text: 'introduction',
                            link: '/components/introduction',
                        }, // /guide/index.md
                        { text: 'One', link: '/guide/one' }, // /guide/one.md
                        { text: 'Two', link: '/guide/two' }, // /guide/two.md
                    ],
                },
            ],
        },
        // [
        //     {
        //         text: 'Guide',
        //         items: [
        //             { text: 'Introduction', link: '/introduction' },
        //             { text: 'Getting Started', link: '/getting-started' },
        //         ],
        //     },

        // ],
    },
    markdown: {
        theme: 'dracula',
    },
    vite: {},
}
