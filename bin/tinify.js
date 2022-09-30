#!/usr/bin/env node

const rootPath = process.cwd()
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const tinify = require('tinify')
tinify.key = 'uGMI6gif8PB0pP7XvLblVsMnBXQIvcBt'
const ora = require('ora')
const loading = ora({
  text: 'loading',
  color: 'yellow'
})
const argv = process.argv.splice(2)[0]
rarImages(argv?argv:rootPath)

async function rarImages(rootPath) {
  if(argv) {
    // 读源文件并写入到另一个文件中
    const source = tinify.fromUrl(argv)
    source.toFile(argv.slice(-10))
    loading.stop()
    console.log(chalk.green(' Success!'))
  } else {
    const files = await readDir(rootPath).then(res => { return res })
    files.map(async file => {
      try {
        // .DS_Store/desktop.ini,mac/win自带描述图片其他信息的东西
        if(file !== '.DS_Store' && file !== 'desktop.ini') {
          loading.start()
          const fullPath = await path.join(rootPath, file)
          const isDir = await isDirectory(fullPath).then(res => { return res })
          if (isDir) {
            //文件夹嵌套则递归调用
            rarImages(fullPath)
          } else {
            // 读源文件并写入到另一个文件中
            const source = tinify.fromFile(fullPath)
            source.toFile(fullPath)
            loading.stop()
            console.log(chalk.grey(fullPath)+chalk.green(' Success!'))
    
            // 从缓冲区(buffer二进制字符串)上传图片并获取压缩后图片数据
            // fs.readFile(fullPath, (err, sourceData) => {
            //   if(err) console(chalk.red(err))
            //   tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
            //     if(err) console.log(err, fullPath)
            //     fs.writeFile(fullPath, resultData, (err) => {
            //       if(err) console.log(chalk.red(err))
            //       loading.stop()
            //       console.log(chalk.grey(fullPath)+chalk.green(' Success!'))
            //     })
            //   })
            // })
          }
        }
      } catch (err) {
        return console.log(chalk.red(err, files))
      }
    })
  }
}


function isDirectory(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) console.log(chalk.red(err))
      resolve(stats.isDirectory() ? true : false)
    })
  })
}

function readDir(path) {
  return new Promise(resolve => {
    fs.readdir(path, (err, files) => {
      if (err) console.log(chalk.red(err))
      resolve(files)
    })
  })
}

function toBufferPromise(sourceData) {
  return new Promise((reslove, reject) => {
    tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
      if (err) reject(err)
      reslove(resultData)
    })
  })
}

function writeFilePromise(file, content, cb) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if (err) throw err
      cb && cb()
      resolve()
    })
  })
}

