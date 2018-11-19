module.exports = {
    title: "springleo's blog",
    head: [
      ['meta', { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' }],
      ['meta', { 'http-equiv': 'pragma', content: 'no-cache' }],
      ['meta', { 'http-equiv': 'expires', content: '0' }],
    ],
    base: "/blogs/dist/",
    dest: "dist",
    themeConfig: {
      sidebarDepth: 0,
      // displayAllHeaders: true, // 默认值：false
      repo: 'https://github.com/lq782655835/blogs',
      docsRepo: 'https://github.com/lq782655835/blogs',
      // 如果你的文档不在仓库的根目录下：
      docsDir: 'docs',
      // 如果你的文档在某个特定的分支（默认是 'master' 分支）：
      docsBranch: 'master',
      // 默认为 false，设置为 true 来启用
      editLinks: true,
      // 自定义编辑链接的文本。默认是 "Edit this page"
      editLinkText: '帮助我改进页面内容！',
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Blogs', items: [
          { text: 'Standard', link: '/team-standard/standard-ai-js.html' },
          { text: 'Recommend', link: '/summary/Vue%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E6%8E%A8%E8%8D%90.html' }
        ] }
      ],
      sidebar: [
        {
          title: "团队规范",
          collapsable: true,
          children: [
            'team-standard/standard-ai-js',
            'team-standard/standard-ai-css',
            'team-standard/standard-ai-vue',
            'team-standard/standard-ai-git'
          ]
        },
        {
          title: "工程推荐",
          collapsable: true,
          children: [
            'team-standard/Vue项目目录结构推荐',
            'team-standard/Vue实例选项顺序推荐',
            'team-standard/Vue-Router写法推荐',
            'team-standard/200错误统一处理推荐'
          ]
        },
        {
          title: "经验总结",
          collapsable: true,
          children: [
            'summary/for in和for of区别',
            'summary/官网脚手架思考与实践',
            'summary/Electron工程踩坑记录',
            'summary/H5 Video踩坑记',
            'summary/团队规范工具集',
            'summary/stylelint样式规范工具',
            'tools/正则表达式一张图总结',
            'tools/npm script技巧',
            'tools/TypeScript开发Vue应用'
          ]
        },
        {
          title: "源码分析",
          collapsable: true,
          children: [
            'code-analysis/Vue2.0源码分析 - 1. 框架结构',
            'code-analysis/ES6-解构赋值及原理'
          ]
        },
        {
          title: "ReactNative",
          collapsable: true,
          children: [
            'react-native/1. ReactNative环境搭建',
            'react-native/2.ReactNative调试技巧',
            'react-native/3.ReactNative使用Eslint检查代码规范'
          ]
        },
        {
          title: "其他",
          collapsable: true,
          children: [
            '一个程序员的成长之路',
            'tools/前端必备效率工具',
            'tools/VSCode使用技巧',
          ]
        }
      ],
      lastUpdated: '最后更新时间', // string | boolean
    }
  }