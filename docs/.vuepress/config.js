module.exports = {
    title: "springleo's blog",
    head: [
        ['meta', { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' }],
        ['meta', { 'http-equiv': 'pragma', content: 'no-cache' }],
        ['meta', { 'http-equiv': 'expires', content: '0' }]
    ],
    base: '/blogs/dist/',
    dest: 'dist',
    themeConfig: {
        sidebarDepth: 0,
        repo: 'https://github.com/lq782655835/blogs',
        docsRepo: 'https://github.com/lq782655835/blogs',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '帮助我改进页面内容！',
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Blogs',
                items: [
                    { text: 'Standard', link: '/team-standard/0.standard-ai-summary.html' },
                    { text: 'Recommend', link: '/summary/recommend-vue-project-structure.html' }
                ]
            }
        ],
        sidebar: [
            {
                key: 'team-standard',
                title: '团队规范',
                collapsable: true,
                children: [
                    'team-standard/0.standard-ai-summary.md',
                    'team-standard/1.standard-ai-css.md',
                    'team-standard/1.standard-ai-git.md',
                    'team-standard/1.standard-ai-js.md',
                    'team-standard/1.standard-ai-vue.md',
                    'team-standard/1.standard-ai-vutool.md',
                    'team-standard/recommend-code200.md',
                    'team-standard/recommend-vue-api-order.md',
                    'team-standard/recommend-vue-project-structure.md',
                    'team-standard/recommend-vuerouter.md'
                ]
            },
            {
                key: 'js',
                title: '前端总结',
                collapsable: true,
                children: [
                    'js/ES6-1.new-feature.md',
                    'js/ES6-2.destruction.md',
                    'js/ES6-3.object.md',
                    'js/axios用法和原理.md',
                    'js/different MVC、MVP、MVVM.md',
                    'js/different for in、for of.md',
                    'js/js-design-pattern.md',
                    'js/nginx.md',
                    'js/node-api-summary.md',
                    'js/node-mongodb.md',
                    'js/node-tool-package.md',
                    'js/node-vscode-debug.md',
                    'js/npm script.md',
                    'js/regex.md',
                    'js/tool-stylelint.md',
                    'js/ts in vue project.md',
                    'js/vue-code-frame.md'
                ]
            },
            {
                key: 'think',
                title: '思考与总结',
                collapsable: true,
                children: [
                    'think/grow-up-front.md',
                    'think/grow-up-life-it.md',
                    'think/project-electron-summary.md',
                    'think/project-h5-video-summary.md',
                    'think/think-cli-official-website.md',
                    'think/《agile-software》-reader-response.md'
                ]
            },
            {
                key: 'react-native',
                title: 'ReacNative',
                collapsable: true,
                children: [
                    'react-native/1. ReactNative环境搭建.md',
                    'react-native/2.ReactNative调试技巧.md',
                    'react-native/3.ReactNative使用Eslint检查代码规范.md'
                ]
            },
            {
                key: 'tools',
                title: '效率工具',
                collapsable: true,
                children: ['tools/1.summary.md', 'tools/record-solution.md', 'tools/vscode.md']
            }
        ],
        lastUpdated: '最后更新时间'
    }
}
