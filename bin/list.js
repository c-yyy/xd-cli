#!/usr/bin/env node

const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const tempaltes = require('../lib/templates')

module.exports = () => {
  for(let key in tempaltes.list) {
    let temp = tempaltes.list[key]
    console.log(
      ' ' + chalk.yellow('⭐️') + 
      ' ' + chalk.green(temp.name) +
      '-' + temp.desc
    )
  }
  if(!tempaltes.list || tempaltes.list.length===0) {
    console.log(chalk.grey('当前无项目模版可用'))
  }
}