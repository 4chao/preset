var fs = require('fs')
var path = require('path')
const { exec } = require('child_process')
const rimraf = require('rimraf').sync

var cache = new Set()

installPackage('src/uni_modules/')
installPackage('uniCloud-aliyun/cloudfunctions')

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function installPackage(filePath) {
  filePath = path.resolve(filePath)
  if (!fs.existsSync(filePath)) return
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        if (filename == 'node_modules') return
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.log(eror)
            console.warn('获取文件stats失败')
          } else {
            var isFile = stats.isFile() //是文件
            var isDir = stats.isDirectory() //是文件夹
            if (isFile) {
              // console.log(filedir);
              if (path.basename(filedir) == 'package.json') {
                if (!cache.has(filePath)) {
                  cache.add(filePath)
                  rimraf(path.join(filePath, 'node_modules'), { disableGlob: true })
                  rimraf(path.join(filePath, 'package-lock.json'), { disableGlob: true })
                  exec(`cd ${filePath} && npm install`, (error) => {
                    if (error) return console.error(`❌ 连接失败: ${error}`)
                    else return console.log('🔌 连接成功 ' + path.basename(filePath))
                  })
                }
              }
            }
            if (isDir) {
              installPackage(filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}
