
const path = require('path')
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const tinify = require('tinify')
const rootPath = process.cwd()
const loading = ora({
  text: 'loading',
  color: 'yellow'
})
tinify.key = 'adsghffdgsa45w3rdzfd'

function isDirectory(filePath, cb) {
  try {
    fs.stat(filePath, (stats, err) => {
      if(err) throw err
      stats.isDirectory ? cb && cb() : console.log(chalk.red('请在图片根目录下进行'))
    })
  } catch (err) {
    console.log(chalk.red(err))
  }
}

function findImg(filePath) {
  try {
    loading.start()
    isDirectory(filePath, () => {
      fs.readdir(filePath, (files, err) => {
        if(err) throw err
        for(let file of files) {
          const fullPath = path.join(filePath, file)
          tinifyImgs(fullPath)
        }
        loading.stop()
      })
    })
  } catch(err) {
    console.log(chalk.red(err))
  }
}

function checkCount() {
  const leftCount = 500 - Number(tinify.compressionCount)
  console.log(chalk.grey(`剩余可用压缩数量:${leftCount}`))
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

async function tinifyImgs(img) {
  try {
    isDirectory(img, () => {
      findImg(img)
    })
    const resultData = await toBufferPromise(img)
    await writeFilePromise(img, resultData, () => {
      console.log(chalk.green('tinify success!'))
      checkCount()
    })
  } catch (err) {
    console.log(chalk.red(err))
  }
}

findImg(rootPath)