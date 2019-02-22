## Pr规范
1. 一个pr只做一件事情,对应一个**issues**或者**teambition**任务
2. `标题`写明白任务名称, 正在做的任务标题前加`[WIP]`,例如：`[WIP]任务3`
3. 正文写介绍下pr主要内容，贴上相关issues或任务的链接，方便以后查阅
4. 最后请@ 相关人员对你的pr进行review
5. 针对别人的评论对你的代码做出修改或说明原因
6. 修改完毕后请先同步主干代码，rebase你的pr，保证你的pr只有一次commit，并且描述清晰。
7. pr 至少有一个评论“LGTM”才可merge

`注意`：
LGTM = Look Good To Me!
LGTM要小心给出，只有你真的觉得代码没问题才可以！**这点很重要**
[WIP] = Work In Process. 看到这个标志表示任务进行中，不需要merge

## 模板
``` git
NOTE: A similar PR may already be submitted! Please search among the Pull request before creating one.

### Types of Changes

**What types of changes does your PR introduce?** Put an x in all boxes that apply

- [x] New addition to list
- [ ] Fixing bug in existing item in list
- [ ] Removing item from list
- [ ] Changing structure (organization) of list

### Proposed Changes

**Describe each of your changes here to communicate to the maintainers why we should accept this pull request.**

Vscode plugin is useful to improve work efficiency for more people. Summarize some practical vscode plugin to prefect the list. Change as follows：
1. add more practical vscode plugin in list
2. provide english/chinese language comment

### PR Checklist

Put an x in the boxes once you've completed each step. You can also fill these out after creating the PR. If you're unsure about any of them, don't hesitate to ask. We're here to help! This is simply a reminder of what we are going to look for before merging your code.

- [x] I have read the CONTRIBUTING guide
- [x] I have explained why this PR is important
- [x] I have added necessary documentation (if appropriate)

### Further Comments

If this is a relatively large or complex change, kick off the discussion by explaining why you chose the solution you did and what alternatives you considered, etc...

```

## 参考文章

* [Pull Request 书写指南](https://segmentfault.com/a/1190000006699503)