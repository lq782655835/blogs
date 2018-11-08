module.exports = {
    title: "springleo's blog",
    head: [
      ['meta', { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' }],
      ['meta', { 'http-equiv': 'pragma', content: 'no-cache' }],
      ['meta', { 'http-equiv': 'expires', content: '0' }],
    ],
    base: "/blogs/",
    dest: "blogs",
    themeConfig: {
      sidebar: [
        '/',
        {
          title: "规范",
          collapsable: false
        },
        {
          title: "推荐",
          collapsable: false
        },
        {
          title: "总结",
          collapsable: false
        },
        {
          title: "解决方案",
          collapsable: false
        }
      ],
      lastUpdated: '最后更新时间', // string | boolean
      // displayAllHeaders: true,
      // repo: 'https://g.hz.netease.com/ARfed/ai-fed-team-standard',
      // repoLabel: '打开 Gitlab',
      // docsDir: 'docs',
      // editLinks: true,
      // editLinkText: '编辑此页'
    }
  }