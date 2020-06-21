# Puppeteer翻页爬虫

> Puppeteer(中文翻译”木偶”) 是 Google Chrome 团队官方的无界面Chrome 工具。

[pagination-crawler](https://github.com/lq782655835/crawler/blob/master/pagination-crawler.js) 是一个使用puppeteer操控搜狗输入法页面翻页，爬取每个页面数据的小爬虫。

## 常用API

page.$ 和page.$$区别：page.$ 等于同于document.querySelector，page.$$ 等同于  document.querySelectorAll。同理page.$eval和page.$$eval区别

page.$ 和page.$eval区别：page.$返回elementHandle，这是puppteer包装的对象（非dom对象），而page.$eval第二个参数是根据第一个参数选择拿到的DOM对象。相对来说，page.$eval有更大的dom操作能力



* 开始
    * browers = await puppeteer.launch({headless:bool})
    * page = await browers.newPage()
    * page.goto(url)
    * browers.close()
* page
    * page.waitFor(2000 or '.selector') 等待时间或某个元素出现
    * page.waitForSelector('.selector').then(() => todo) 等待元素出现后执行todo
    * page.click('.selector')

* 获取/操作页面元素
    * 获得被包装的elementHandle值
        * page.$('.el') 被包装成elementHandle的document.querySelector值
        * page.$('.el') 被包装成elementHandle的document.querySelectorAll值
    * 选择，第二个参数为dom
        * page.$eval('.el', dom => dom) 获取document.querySelector值后，在浏览器环境处理
        * await page.$$eval('.el', doms => doms) 获取document.querySelectorAll值后，在浏览器环境处理
    * 执行脚本  类似于在控制台中执行指令
        * await page.evaluate(body => body.innerHTML, await page.$('body')); 浏览器环境下执行的代码
* 拦截请求
    * page.setRequestInterception(true) 开启拦截请求
    * page.on('request',interceptedRequest => interceptedRequest.abort()) 拦截逻辑