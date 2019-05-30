为何需要codereview
1. 消除显而易见的bug，消除测试。
1. 代码规范，包括风格、写法，学习优秀源码。
1. 产品内容至少两人了解，方便可能的合作。

## PR规范

1. 原则：一个pr只做一件事情,对应一个jira/issue（如果有）。
1. 提pr前先同步主干分支（一般为develop，分支规范看[AI前端Git规范]()）。
1. 正文介绍这个pr大概做了哪些内容，贴上相关jira/issues链接（如果有），方便以后查阅。
1. @相关人员对你的pr进行review。
1. 针对别人的评论对你的代码做出修改或说明原因。
1. pr review完，评论“LGTM”。

* 建议：
    1. 建议从新项目启动就开始，小改动（hotfix、小需求等）可不提PR。
    1. 当项目需要迭代上线时，可自行merge，审核人review不影响。
* 技巧：
    1. 正在做的任务标题前加`[WIP]`(此时无法被merge)
    1. 一个pr如果有多次提交，rebase你的pr，保证pr只有一次commit，并且描述清晰。
* 其他
    * [Creating a pull request](https://help.github.com/en/articles/creating-a-pull-request)
    * [Merging a pull request](https://help.github.com/en/articles/merging-a-pull-request)
    * [10 tips for better Pull Requests](https://blog.ploeh.dk/2015/01/15/10-tips-for-better-pull-requests/)
    * [Pull Request 书写指南](https://github.com/amio/pull-request-guide)

> LGTM = Look Good To Me!

> [WIP] = Work In Process
