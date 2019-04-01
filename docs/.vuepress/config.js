module.exports = {
    title: "springleo's blog",
    head: [
        ['meta', { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' }],
        ['meta', { 'http-equiv': 'pragma', content: 'no-cache' }],
        ['meta', { 'http-equiv': 'expires', content: '0' }],
        ['link', { rel: 'icon', href: './favicon.ico' }]
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
            { text: 'Home', link: '/' },
            {
                text: 'tools',
                items: [
                    { text: 'yiai-cli', link: 'https://github.com/lq782655835/yiai-cli' },
                    {
                        text: 'node-vuepress-auto-read',
                        link: 'https://github.com/lq782655835/node-vuepress-auto-read'
                    },
                    { text: 'json2ts', link: 'https://github.com/lq782655835/json2ts' },
                    {
                        text: 'svg-icon-webpack-plugin',
                        link: 'https://github.com/lq782655835/svg-icon-webpack-plugin'
                    },
                    {
                        text: 'cache-manage-js',
                        link: 'https://github.com/lq782655835/cache-manage-js'
                    }
                ]
            },
            {
                text: 'templates',
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
                key: 'js',
                title: '前端总结',
                collapsable: true,
                children: [
                    'js/array-v8-method.md',
                    'js/axios-usage-theory.md',
                    'js/different-for-in-for-of.md',
                    'js/git-command.md',
                    'js/http-cross-domain.md',
                    'js/js-design-pattern.md',
                    'js/js-polyfill.md',
                    'js/markdown-it-code.md',
                    'js/npm script.md',
                    'js/postcss.md',
                    'js/regex.md',
                    'js/tool-stylelint.md',
                    'js/ts-in-vue-project.md',
                    'js/ts-tsconfig.md',
                    'js/ts-vue-shortcoming.md',
                    'js/vue-code-frame.md',
                    'js/webapck4-devServer.md',
                    'js/webpack-module.md',
                    'js/webpack3.x-to-webpack4.md'
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
                    'think/refactor-your-js-code.md',
                    'think/think-cli-official-website.md',
                    'think/think-different-MVC-MVP-MVVM.md'
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
                key: 'es6',
                title: 'ES6',
                collapsable: true,
                children: [
                    'es6/es6-1.new-feature.md',
                    'es6/es6-2.destruction.md',
                    'es6/es6-3.object.md',
                    'es6/es6-4.module.md',
                    'es6/es6-latest-feature.md'
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
            },
            {
                key: 'tools',
                title: '效率工具',
                collapsable: true,
                children: [
                    'tools/0.tool-summary.md',
                    'tools/charles-tool.md',
                    'tools/python-grammar.md',
                    'tools/record-solution.md',
                    'tools/shell-vim.md',
                    'tools/vscode.md',
                    'tools/yarn-vs-npm.md'
                ]
            }
        ],
        lastUpdated: '最后更新时间'
    }
}
