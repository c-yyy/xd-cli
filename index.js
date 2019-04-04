#!/usr/bin/env node

const program = require('commander')
const package = require('./package.json')
const list = require('./bin/list')

program
  .version(package.version)
  .usage('<command> [option]')

program.command('list')
  .description('请选择项目模版')
  .alias('ls')
  .action(() => {
    list()
  })

program.parse(process.argv)

if(program.args.length === 0) {
  program.help() // 不带参数，help
}