# Puppeteer翻页爬虫

> Puppeteer(中文翻译”木偶”) 是 Google Chrome 团队官方的无界面Chrome 工具。

[pagination-crawler](https://github.com/lq782655835/crawler/blob/master/pagination-crawler.js) 是一个使用puppeteer操控搜狗输入法页面翻页，爬取每个页面数据的小爬虫。

## 常用API

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
    * page.$('#el') 被包装成elementHandle的document.querySelector值
    * page.$('.el') 被包装成elementHandle的document.querySelectorAll值
    * page.$eval('#el', dom => dom) 获取document.querySelector值后，在浏览器环境处理
    * await page.$$eval('.el', doms => doms) 获取document.querySelectorAll值后，在浏览器环境处理
    * await page.evaluate(body => body.innerHTML, await page.$('body')); 浏览器环境下执行的代码
* 拦截请求
    * page.setRequestInterception(true) 开启拦截请求
    * page.on('request',interceptedRequest => interceptedRequest.abort()) 拦截逻辑