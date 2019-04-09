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

rarImages(rootPath)

async function rarImages(rootPath) {
  const files = await readDir(rootPath).then(res=>{return res})
  files.map(async file => {
    try {
      loading.start()
      const fullPath = await path.join(rootPath, file)
      const isDir = await isDirectory(fullPath).then(res=>{return res})
      if(isDir) {
        rarImages(fullPath)
      } else {
        fs.readFile(fullPath, (err, sourceData) => {
          if(err) console.log(chalk.red(err))
          tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
            if(err) console.log(chalk.red(err))
            fs.writeFile(fullPath, resultData, (err) => {
              if(err) console.log(chalk.red(err))
              loading.stop()
              console.log(chalk.grey(fullPath)+chalk.green('🚀 Success!'))
            })
          })
        })
      }
    } catch (err) {
      return console.log(chalk.red(err))
    }
  })
}


function isDirectory(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if(err) console.log(chalk.red(err))
      resolve(stats.isDirectory() ? true : false)
    })
  })
}

function readDir(path) {
  return new Promise(resolve => {
    fs.readdir(path, (err, files) => {
      if(err) console.log(chalk.red(err))
      resolve(files)
    })
  })
}

function toBufferPromise(img) {
  fs.readFile(img, (sourceData, err) => {
    if(err) throw err
    tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
      if(err) throw err
      return resultData
    })
  })
}

function writeFilePromise(file, content, cb) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if(err) throw err
      cb && cb()
      resolve()
    })
  })
}

