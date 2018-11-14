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
          collapsable: false
        },
        {
          title: "源码分析",
          collapsable: false
        },
        {
          title: "其他",
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