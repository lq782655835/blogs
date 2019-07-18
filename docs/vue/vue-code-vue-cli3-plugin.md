# Vue CLI3 插件系统原理

vue-cli3创建的项目中，你是否好奇执行`vue-cli-service serve`命令时，vue-cli-service是什么？执行serve命令时发生了什么？为什么可以零配置的情况下跑起webpack？另外，当安装@vue/cli-plugin-typescript插件时，为什么会给项目设置TypeScirpt环境（ts-loader、tslint等）？为什么执行`vue-cli-service lint`命令会变成用tslint检查？

一切都得益于vue-cli3良好的插件系统，通过vue-cli内置插件以及外部插件作用，动态修改webpack配置,使得在零配置webpack的基础上，也有高扩展性。
整个插件系统当中包含2个重要的组成部分：`@vue/cli`以及`@vue/cli-service`。@vue/cli提供cli服务，比如`vue create`。@vue/cli-service提供本地开发构建服务，比如`vue-cli-service serve`。这里我们分析下@vue/cli-service本地构建服务。

## 认识service插件

先看官方插件@vue/cli-plugin-typescript [ReadMe](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-typescript/README.md)。了解到该插件给本地服务提供了TypeScript环境，包括替换模板文件、加载ts-loader和cache-loader、基于TSLint注册lint命令等。再看下这部分源码：
``` js
module.exports = (api, options) => {
  const fs = require('fs')
  const useThreads = process.env.NODE_ENV === 'production' && !!options.parallel

  api.chainWebpack(config => {
    config.resolveLoader.modules.prepend(path.join(__dirname, 'node_modules'))

    // 修改入口文件
    if (!options.pages) {
      config.entry('app')
        .clear()
        .add('./src/main.ts')
    }
    
    ...

    // 注册vue-cli-service lint命令
    if (!api.hasPlugin('eslint')) {
    api.registerCommand('lint', {
      description: 'lint source files with TSLint',
      usage: 'vue-cli-service lint [options] [...files]',
      options: {
        '--format [formatter]': 'specify formatter (default: codeFrame)',
        '--no-fix': 'do not fix errors',
        '--formatters-dir [dir]': 'formatter directory',
        '--rules-dir [dir]': 'rules directory'
      }
    }, args => {
      return require('./lib/tslint')(args, api)
    })
  }
}
```
以上我们知道，`每个service plugin都是一个CommonJS模块，其中带了两个参数：api和options。`这两个参数代表什么意思呢？api其实是PluginAPI类的实例，options是vue.config.js选项对象。为什么需要暴露这两个参数给外部开发者呢？具体我们看下@vue/cli-service源码：

## @vue/cli-service源码解析

先看下vue-cli-service命令做了什么：
``` js
// cli-service/bin/vue-cli-service.js
const Service = require('../lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0]

service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})
```
以上主要是新建了Service类，同时把当前执行路径process.cwd()当作参数传入，这在路径解析项目本地package.json时有用到。`service实例类负责管理内部的 webpack 配置、暴露服务和构建项目的命令等`。另外执行了service下的run方法，参数是定义的build/serve/inspect。
接下来看下Service类的构造函数以及run方法。

``` js
class Service {
  constructor (context, { plugins, pkg, inlineOptions, useBuiltIn } = {}) {
    process.VUE_CLI_SERVICE = this
    this.initialized = false
    this.context = context // 命令路径
    this.inlineOptions = inlineOptions
    // webpackChain方法都先保存起来
    this.webpackChainFns = []
    this.webpackRawConfigFns = []
    this.devServerConfigFns = []
    this.commands = {} // 注册的命令
    // Folder containing the target package.json for plugins
    this.pkgContext = context
    // package.json containing the plugins
    this.pkg = this.resolvePkg(pkg)
    // 解析内置plugin以及项目中用到的plugin
    // 详细见后面解释
    this.plugins = this.resolvePlugins(plugins, useBuiltIn)
    
    this.modes = this.plugins.reduce((modes, { apply: { defaultModes }}) => {
      return Object.assign(modes, defaultModes)
    }, {})
  }
```
Service构造函数主要初始化了一些参数，最主要的是`resolvePkg方法`，把内置的Plugin和项目本地的Plugin解析出来，详细见如下代码：
``` js
resolvePlugins (inlinePlugins, useBuiltIn) {
    const idToPlugin = id => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(id) // commomjs规范，引入id对应的插件
    })

    let plugins

    // 内置插件
    const builtInPlugins = [
      // 命令相关插件
      './commands/serve', // 默认vue-cli-service serve命令逻辑
      './commands/build',
      './commands/inspect',
      './commands/help',
      // 配置文件也是以插件形式注入
      './config/base',
      './config/css',
      './config/dev',
      './config/prod',
      './config/app'
    ].map(idToPlugin)

    if (inlinePlugins) {
      // inlinePlugins，通常为空
      plugins = useBuiltIn !== false
        ? builtInPlugins.concat(inlinePlugins)
        : inlinePlugins
    } else {
      // 读取用户项目下package.json，根据Dependencies，解析用户使用的Plugin
      const projectPlugins = Object.keys(this.pkg.devDependencies || {})
        .concat(Object.keys(this.pkg.dependencies || {}))
        .filter(isPlugin) // isPlugin命名规范: /^(@vue\/|vue-|@[\w-]+\/vue-)cli-plugin-/
        .map(id => {
          if (
            this.pkg.optionalDependencies &&
            id in this.pkg.optionalDependencies
          ) {
            let apply = () => {}
            try {
              apply = require(id)
            } catch (e) {
              warn(`Optional dependency ${id} is not installed.`)
            }

            return { id, apply }
          } else {
            return idToPlugin(id)
          }
        })
      plugins = builtInPlugins.concat(projectPlugins)
    }

    // Local plugins
    if (this.pkg.vuePlugins && this.pkg.vuePlugins.service) {
      const files = this.pkg.vuePlugins.service
      if (!Array.isArray(files)) {
        throw new Error(`Invalid type for option 'vuePlugins.service', expected 'array' but got ${typeof files}.`)
      }
      plugins = plugins.concat(files.map(file => ({
        id: `local:${file}`,
        apply: loadModule(`./${file}`, this.pkgContext)
      })))
    }

    return plugins
  }
```
由上面可知，在初始化Service过程中，会`收集cli内置插件以及用户项目下使用到的vue-cli插件`（只是收集，还没有执行插件代码），插件过滤规则是根据项目名称：/^(@vue\/|vue-|@[\w-]+\/vue-)cli-plugin-/。接下来我们继续看service.run方法：
``` js
async run (name, args = {}, rawArgv = []) {
    const mode = args.mode || (name === 'build' && args.watch ? 'development' : this.modes[name])

    // 读取配置文件以及应用所有插件plugins
    this.init(mode)

    // 根据name，执行commands[name]里的注册的方法
    // commands[name]方法是根据实例化的插件，动态插入的
    args._ = args._ || []
    let command = this.commands[name]
    if (!command && name) {
      error(`command "${name}" does not exist.`)
      process.exit(1)
    }
    if (!command || args.help || args.h) {
      command = this.commands.help
    } else {
      args._.shift() // remove command itself
      rawArgv.shift()
    }
    const { fn } = command
    return fn(args, rawArgv)
  }
```
从run方法可知，最终是`执行注册到名为name的commands对象的方法fn`，即：commands={name: fnn, ...}。那commands是如何做到动态插入的呢？答案在各个插件中，通过插件动态创建命令以及修改webpack config等。源码是在init方法中，执行收集到的所有插件代码：

``` js
init (mode = process.env.VUE_CLI_MODE) {
    if (this.initialized) {
      return
    }
    this.initialized = true
    this.mode = mode

    // 本地环境读取
    // load mode .env
    if (mode) {
      this.loadEnv(mode)
    }
    // load base .env
    this.loadEnv()
    // load user config
    const userOptions = this.loadUserOptions()
    this.projectOptions = defaultsDeep(userOptions, defaults())
    debug('vue:project-config')(this.projectOptions)

    // 应用插件
    this.plugins.forEach(({ id, apply }) => {
      // apply方法就是插件export.default导出的函数
      // 每个插件都注入两个参数：实力化的PluginAPI以及项目配置对象projectOptions
      apply(new PluginAPI(id, this), this.projectOptions)
    })

    // 允许项目中的vue.config.js也可以修改webpack配置
    // 放在所有插件后，merged也最优先
    if (this.projectOptions.chainWebpack) {
      this.webpackChainFns.push(this.projectOptions.chainWebpack)
    }
    if (this.projectOptions.configureWebpack) {
      this.webpackRawConfigFns.push(this.projectOptions.configureWebpack)
    }
  }
```
从上可知，在init方法中会执行所有service插件，其中会注入两个参数，一个是实例化上的PluginAPI，另外一个是项目的配置对象projectOptions。这就是本文开头说的，每个插件都会暴露两个参数。PluginAPI又做了什么事呢？它其实只是单纯的代理了service实例的属性，通过暴露一些方法，给各个插件有机会去动态的修改唯一的service实例内的属性，使得可以根据service实例生成最终的项目webpack配置文件。同时对插件暴露的注册命令方法`registerCommand`，使得开发着可以自定义命令参数以及相关逻辑，使得扩展整个应用。

``` js
class PluginAPI {
  constructor (id, service) {
    this.id = id
    this.service = service // 所有service plugin都是同一个service实例
  }

  hasPlugin (id) {
    return this.service.plugins.some(p => matchesPluginId(id, p.id))
  }

  // pluginAPI的方法，代理了service属性
  // 通过api，各个插件修改的是同一个service
  registerCommand (name, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts
      opts = null
    }
    this.service.commands[name] = { fn, opts: opts || {}}
  }

  chainWebpack (fn) {
    this.service.webpackChainFns.push(fn)
  }

  configureWebpack (fn) {
    this.service.webpackRawConfigFns.push(fn)
  }

  configureDevServer (fn) {
    this.service.devServerConfigFns.push(fn)
  }

  // 得到最终的Webpack配置文件
  resolveWebpackConfig (chainableConfig) {
    return this.service.resolveWebpackConfig(chainableConfig)
  }

  // 得到链式调用的Webpack配置
  resolveChainableWebpackConfig () {
    return this.service.resolveChainableWebpackConfig()
  }
```

## 总结

以上就是整个Service插件系统的核心内容，所有配置在Service实例类中集合，同时允许各个Service Plugin动态的去修改单例模式的service对象，使得很好的解耦了整个插件系统。

现在再来解释文章开头的问题：
1. vue-cli-service是什么？vue-cli-service提供了本地开发构建服务。
2. 执行serve命令时发生了什么？收集各个插件中设置的webpack参数，并生成最终的webpack配置，再根据配置创建compiler，再启动WebpackDevServer。
3. 为什么可以零配置的情况下跑起webpack？vue-cli3内置了一些命令和配置，并且这些命令和配置都是以插件形式提供。
4. 为什么会给项目设置TypeScirpt环境？service插件的api参数，提供了动态修改webpack的能力(基于[webpack-chain](https://github.com/neutrinojs/webpack-chain)链式调用修改)。
5. 为什么执行`vue-cli-service lint`命令会变成用tslint检查？插件可以动态的注册命令以及对应的逻辑，扩展本地项目能力。
