let path = require('path')
let glob = require('glob') // 用于筛选文件
const openPage = process.env.page
// 工厂函数 - 配置pages实现多页面获取某文件夹下的html与js
function handleEntry(entry, page) {
    let entries = {}
    let entryBaseName = ''
    let entryPathName = ''
    let entryTemplate = ''

    glob.sync(entry).forEach(item => {
        // console.log('!!!', item)
        entryBaseName = path.basename(item, path.extname(item))
        // console.log('entryBaseName:', entryBaseName)
        entryTemplate = item.split('/').splice(-3)
        // console.log('entryTemplate:', entryTemplate)
        entryPathName = entryBaseName // 正确输出js和html的路径
        // console.log('entryPathName', entryPathName)

        entries[entryPathName] = {
            entry: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + 'main.js',
            template: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[2],
            title: entryTemplate[2],
            filename: entryTemplate[2]
        }
    })
    return entries
}

let pages = handleEntry('./src/pages/**?/*.html', openPage)
let outputDir = './dist/'
let enterUrl = openPage ? `/${openPage}.html` : '/'
if (openPage) {
  outputDir = `./dist/${openPage}` // 打包文件放到dist/项目名称  下
}
// 以下开始配置
module.exports = {
    lintOnSave: false, // 关掉eslint
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    productionSourceMap: false,
    // 入口设置
    pages,
    outputDir,
    devServer: {
        index: enterUrl,// 运行时，打开自己定义的项目
        // 告诉dev-server在服务器启动后打开浏览器，将其设置true为打开默认浏览器
        open: true,
        port: 8080,
        https: false,
        hotOnly: false,
        // 配置首页 入口链接
        before: app => {
          // 如果没有设置运行的项目则打开全部
          if (!openPage) {
            app.get('/', (req, res, next) => {
              for (let i in pages) {
                  res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
              }
              res.end()
            });
          }
        }
    }
}
