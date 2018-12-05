const fs = require('fs')
const { join } = require('path')
const { folderTitleMap = {} } = require('./config.json')

/**
 *
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath, titleMap) {
    let result = []
    function finder(path) {
        let files = fs.readdirSync(path)
        for (val of files) {
            let fPath = join(path, val)
            let stats = fs.statSync(fPath)

            let includeDirTitle = titleMap[val]
            let isValidDir = stats.isDirectory() && includeDirTitle
            let isValidFile = stats.isFile() && val.endsWith('.md')

            if (isValidDir) {
                result.push({
                    key: val,
                    title: includeDirTitle,
                    collapsable: true,
                    children: []
                })
                finder(fPath)
            }

            if (isValidFile) {
                let pathArray = fPath.split('/')
                let key = pathArray.slice(-2, -1).join('')
                let item = result.find(item => item.key === key)
                item && item.children.push(pathArray.slice(-2).join('/'))
            }
        }
    }
    finder(startPath)
    return result
}

function getConfigByDir() {
    let getSideBar = findSync('./docs', folderTitleMap)
    let resultOrderSideBar = []
    Object.keys(folderTitleMap).forEach(key =>
        resultOrderSideBar.push(getSideBar.find(item => item.key === key))
    )
    return resultOrderSideBar
}

function overrideConfigFile(path) {
    let jsPrefix = 'module.exports = '
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        // override sidebar
        let jsonStr = data.replace('module.exports = ', '')
        let jsonData = eval(`(${jsonStr})`)
        jsonData.themeConfig.sidebar = getConfigByDir()
        let overrideStr = jsPrefix + JSON.stringify(jsonData)

        fs.writeFile(path, overrideStr, 'utf8', err => (err ? err : 'OverRide Succesful'))
    })
}

overrideConfigFile('./docs/.vuepress/config.js')
