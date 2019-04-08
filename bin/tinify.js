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

function tinifyImg(filePath) {
  fs.stat(filePath, (err, stats) => {
    if(err) throw err
    const isDir = stats.isDirectory()
    if(isDir) {
      fs.readdir(filePath, (err, files) => {
        if(err) throw err
        console.log(1,files)
      })
    } else {
      console.log(chalk.red('请在图片根目录下进行'), rootPath)
    }
  })
}

tinifyImg(rootPath)