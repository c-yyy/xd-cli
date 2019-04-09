#!/usr/bin/env node

const rootPath = process.cwd()
const images = require('images')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const loading = ora({
  text: 'loading',
  color: 'blue'
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
        images(fullPath).save(fullPath, {quality:50})
        console.log(chalk.grey(fullPath)+chalk.green('🚀 Success!'))
        loading.stop()
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


