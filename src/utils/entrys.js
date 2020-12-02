/* utils.js */
const path = require('path');

// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob');

// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
const PAGE_PATH = path.resolve(__dirname, '../entrys');
const file_name = process.argv[4];
/*
* 多入口配置
* 通过 glob 模块读取 pages 文件夹下的所有对应文件夹下的 js * 后缀文件，如果该文件存在
* 那么就作为入口处理
*/
exports.getEntries = (data) => {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js') // 同步读取所有入口文件
  let map = {}
  // 遍历所有入口文件
    entryFiles.forEach(filePath => {
      // 获取文件名
    // let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))

    let filePathArr = filePath.split('/');
    let fileName = filePathArr[filePathArr.length-2];

    let conf = {
      entry : filePath,
      template: filePath.replace(/main.js/g,'index.html'),
      filename: 'index.html',
      chunks : ['chunk-vendors','chunk-common',fileName]
    }
    if(file_name == fileName){
      map[fileName] = conf
    }

  })
  return map
}
