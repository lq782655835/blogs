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
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Blogs', items: [
          { text: 'Standard', link: '/team-standard/standard-ai-js.html' },
          { text: 'Recommend', link: '/summary/Vue%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E6%8E%A8%E8%8D%90.html' }
        ] },
        { text: 'GitHub', link: 'https://github.com/lq782655835/blogs' },
      ],
      sidebar: [
        {
          title: "团队规范",
          collapsable: false,
          children: [
            'team-standard/standard-ai-js',
            'team-standard/standard-ai-css',
            'team-standard/standard-ai-vue',
            'team-standard/standard-ai-git'
          ]
        },
        {
          title: "经验总结",
          collapsable: true,
          children: [
            'summary/Vue项目目录结构推荐',
            'summary/Vue实例选项顺序推荐',
            'summary/Vue-Router写法推荐',
            'summary/200错误统一处理推荐',
            'summary/for in和for of区别',
            'summary/官网脚手架思考与实践',
            'summary/Electron工程踩坑记录',
            'summary/H5 Video踩坑记',
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