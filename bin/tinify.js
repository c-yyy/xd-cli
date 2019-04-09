#!/usr/bin/env node

const rootPath = process.cwd()
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const tinify = require('tinify')
tinify.key = 'uGMI6gif8PB0pP7XvLblVsMnBXQIvcBt'
const ora = require('ora')
const loading = ora({
  text: '',
  color: 'blue'
})

tinifyImg(rootPath)

function tinifyImg(filePath) {
  try {
    fs.readdir(filePath, (err, files) => {
      if(err) throw err
      files.map(file => {
        fs.stat(file, (err, stat) => {
          if(err) throw err
          loading.start()
          const isFile = stat.isFile()
          const isDir = stat.isDirectory()
          const fileDir = path.join(filePath, file)
          if(isFile) {
            fs.readFile(file, (err, sourceData) => {
              if(err) throw err
              tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
                if(err) throw err
                fs.writeFile(file, resultData, () => {
                  console.log(chalk.green(file+'__@success!'))
                  loading.stop()
                })
              })
            })
          } else if(isDir) {
            tinifyImg(fileDir)
          } else {
            console.log(chalk.red('文件格式不对'))
          }
        })
      })
    })
  } catch(err) {
    return
  }
}
