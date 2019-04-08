module.exports = {
    title: "springleo's blog",
    head: [
        ['meta', { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' }],
        ['meta', { 'http-equiv': 'pragma', content: 'no-cache' }],
        ['meta', { 'http-equiv': 'expires', content: '0' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    base: '/blogs/',
    dest: 'site',
    plugins: ['@vuepress/medium-zoom', '@vuepress/back-to-top'],
    themeConfig: {
        sidebarDepth: 0,
        repo: 'https://github.com/lq782655835/blogs',
        docsRepo: 'https://github.com/lq782655835/blogs',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '帮助我改进页面内容！',
        nav: [
            { text: '首页', link: '/' },
            {
                text: '工具',
                items: [
                    { text: 'yiai-cli脚手架工具', link: 'https://github.com/lq782655835/yiai-cli' },
                    {
                        text: 'node-vuepress-auto-read 自动生成blog目录工具',
                        link: 'https://github.com/lq782655835/node-vuepress-auto-read'
                    },
                    {
                        text: 'json2ts url转TypeScript工具',
                        link: 'https://github.com/lq782655835/json2ts'
                    },
                    {
                        text: 'svg-icon-webpack-plugin svg转vue组件工具',
                        link: 'https://github.com/lq782655835/svg-icon-webpack-plugin'
                    },
                    {
                        text: 'cache-manage-js缓存管理工具',
                        link: 'https://github.com/lq782655835/cache-manage-js'
                    }
                ]
            },
            {
                text: '工程模板',
                items: [
                    { text: 'vue', link: 'https://github.com/lq782655835/standard-vue-project' },
                    {
                        text: 'typescript',
                        link: 'https://github.com/lq782655835/standard-vue-typescript-project'
                    },
                    {
                        text: 'official-website',
                        link: 'https://github.com/lq782655835/official-website-template'
                    },
                    {
                        text: 'electron',
                        link: 'https://github.com/lq782655835/electron-vue-template'
                    },
                    { text: 'mpvue', link: 'https://github.com/lq782655835/mpvue-project' }
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
                    'team-standard/clean-code-javascript.md',
                    'team-standard/recommend-code200.md',
                    'team-standard/recommend-css-font.md',
                    'team-standard/recommend-vue-api-order.md',
                    'team-standard/recommend-vue-project-structure.md',
                    'team-standard/recommend-vuerouter.md'
                ]
            },
            {
                key: 'project',
                title: '思考与总结',
                collapsable: true,
                children: [
                    'project/axios-usage-theory.md',
                    'project/grow-up-front.md',
                    'project/grow-up-life-it.md',
                    'project/markdown-it-code.md',
                    'project/postcss.md',
                    'project/project-electron-summary.md',
                    'project/project-h5-video-summary.md',
                    'project/refactor-your-js-code.md',
                    'project/think-cli-official-website.md',
                    'project/tool-stylelint.md',
                    'project/ts-in-vue-project.md',
                    'project/ts-tsconfig.md',
                    'project/ts-vue-shortcoming.md',
                    'project/vue-code-frame.md',
                    'project/webapck4-devServer.md',
                    'project/webpack-module.md',
                    'project/webpack3.x-to-webpack4.md'
                ]
            },
            {
                key: 'js',
                title: 'JS',
                collapsable: true,
                children: [
                    'js/array-v8-method.md',
                    'js/different-for-in-for-of.md',
                    'js/es6-1.new-feature.md',
                    'js/es6-2.destruction.md',
                    'js/es6-3.object.md',
                    'js/es6-4.module.md',
                    'js/es6-latest-feature.md',
                    'js/http-cross-domain.md',
                    'js/http-url.md',
                    'js/js-design-pattern.md',
                    'js/js-polyfill.md',
                    'js/js-prototype.md',
                    'js/regex.md',
                    'js/think-different-MVC-MVP-MVVM.md'
                ]
            },
            {
                key: 'node',
                title: 'NodeJS',
                collapsable: true,
                children: [
                    'node/nginx.md',
                    'node/node-api-summary.md',
                    'node/node-express-api.md',
                    'node/node-module.md',
                    'node/node-mongodb.md',
                    'node/node-tool-package.md',
                    'node/node-vscode-debug.md',
                    'node/redis.md'
                ]
            },
            {
                key: 'react',
                title: 'React',
                collapsable: true,
                children: [
                    'react/diff-vue-vs-react.md',
                    'react/diff-vuex-redux.md',
                    'react/function-program.md',
                    'react/react-eslint.md',
                    'react/react-native-debug-skill.md',
                    'react/react-native-environment-mac.md',
                    'react/react.md'
                ]
            },
            {
                key: 'tools',
                title: '效率工具',
                collapsable: true,
                children: [
                    'tools/0.tool-summary.md',
                    'tools/charles-tool.md',
                    'tools/git-command.md',
                    'tools/npm script.md',
                    'tools/python-grammar.md',
                    'tools/record-solution.md',
                    'tools/shell-vim.md',
                    'tools/vscode.md',
                    'tools/yarn-vs-npm.md'
                ]
            },
            {
                key: 'read-books',
                title: '读书笔记',
                collapsable: true,
                children: [
                    'read-books/0.how-to-improve-reading.md',
                    'read-books/book-agile-software.md',
                    'read-books/book-design-for-all.md',
                    'read-books/book-head-first-design-patterns.md',
                    'read-books/book-soft-skills.md'
                ]
            }
        ],
        lastUpdated: '最后更新时间'
    }
}
