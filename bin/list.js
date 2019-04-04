#!/usr/bin/env node

const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const ora = require('ora')
const tempaltes = require('../lib/templates')

const loading = ora({
  text: 'loading',
  color: 'yellow'
})

module.exports = () => {
  if(!tempaltes || tempaltes.length===0) {
    console.log(chalk.yellow('当前无项目模版可用'))
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'list',
        message: '选择项目模版?',
        choices: tempaltes
      }
    ]).then((res) => {
      tempaltes.map(v => {
        if(v.name === res.list) {
          const url = v.url
          loading.start()
          download(`direct:${url}`, res.list, {clone: true}, (err) => {
            loading.stop()
            console.log(err ? chalk.red('Error') : chalk.green('Success'))
          })
        }
      })
    })
  }
}