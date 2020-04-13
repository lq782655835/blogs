## Circle CI用法

## 基本
1.Register CircleCI
Open CircleCI official website and login with your GitHub account.

2.Enable repository
Check the switch button of the repos you want to manage on CircleCI.

3.Make config.yml
Create a config file for CircleCI named config.yml in your project root or .circleci directory.

```yml
version: 2.1
orbs:
    node: circleci/node@1.1.6
jobs:
    build-and-test:
        executor:
            name: node/default
        steps:
            - checkout
            - node/with-cache:
                steps:
                    - run: npm install
                    - run: npm run build
workflows:
    build-and-test:
        jobs:
            - build-and-test
```

## 高级

需要push权限发布gh-pages。

主要是在生成公钥和私钥，公钥放在github项目的setting中，私钥放在circle ci的setting中。然后circleci会返回一个私钥指纹fingerprints，把这个配置进yml文件中即可赋予circleci拥有github项目的push权限。

:::warning
注意记得设置全局的email/username，不然gh-pages工具会报错
:::

1. Generate a new ssh key
2. Upload ssh key
    * Upload the id_rsa.pub on your GitHub repo settings at https://github.com/<your_name>/<your_repo>/settings/keys
    * Go to https://circleci.com/gh/<your_name>/<your_repo>/edit#ssh on CircleCI and add the private key id_rsa that you just created. Enter github.com in the Hostname field and press the submit button.
3. Add ssh key to your config file(不要忘了全局设置email/username)
``` yml
steps:
    - add_ssh_keys:
        fingerprints:
            - '54:19:54:8f:1d:d3:d7:c3:8c:06:09:c0:b3:36:5e:08'
    - checkout
    - node/with-cache:
        steps:
            - run: npm install
            - run: npm run build
            - run: # git push
                name: push-github
                command: |
                    git config --global user.email "782655835@qq.com"
                    git config --global user.name "lq782655835"
                    npm run ghpages
```

参考：
* https://juejin.im/entry/5a38ba46f265da43133d4545
* https://hddhyq.github.io/2019/01/31/CircleCI%E5%AE%9E%E8%B7%B5gh-pages%E9%83%A8%E7%BD%B2/

## Mocha开发

1. 添加工具npm install mocha chai --save-dev
2. 添加文件test/index.spec.js
``` js
const { expect } = require('chai');

describe('mocha', () => {
    it('download', async () => {
        await expect(1).to.equal(1);
    });
});
```
3. 启动单测命令："mocha --timeout 60000 test/**/*.spec.js"

## 辅助工具

* husky + lint-staged + prettier 基础统一格式化代码
* commitlint + husky: 规范commit 日志。
    * 教程：https://github.com/conventional-changelog/commitlint
    * npm install --save-dev @commitlint/{config-conventional,cli}
* commitizen cz-conventional-changelog：使用git-cz代替git commit命令，统一团队Git commit 文本标准。
    * 教程：https://www.jianshu.com/p/eff5726f8633
    * npm i commitizen cz-conventional-changelog --save-dev
* conventional-changelog-cli 自动根据commit生成changelog
    * 教程：https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli
    * npm install conventional-changelog-cli -D
* github
    * gh-pages（发布demo到github）
    * release-it/[standard-version](https://github.com/conventional-changelog/standard-version)（自动提交github代码 + 自动修改lib库版本 + 推送npm服务器）

:::warning
husky + lint-staged + prettier作为基础工具。
commitlint约束提交规范。
commitizen让工具通过select选项，进行git commit。
release-it核心是可以把包自动发送到npm上。
:::

cz工具教程：
* https://www.cnblogs.com/mengfangui/p/12634845.html（cz + log）
* https://blog.csdn.net/weixin_33890526/article/details/91393527 cz适配器

* 平时开发提交commit： npm run commit "commit": "git add -A && git-cz",
* 发布npm包: npm publish "prepublish": "npm run build && release-it && npm run changelog",
* 发布docs: npm run docs "release:docs": "npm run build:docs && gh-pages -d docs/.vuepress/dist",
