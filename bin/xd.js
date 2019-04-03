#!/usr/bin/env node

const program = require('commander')
const colors = require('colors')

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    info: 'cyan',
    success: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue'
})

program
  .version(require('../package.json').version)
  .option('-v, --version')
  .action('-ls, --list', (dir, cmd) => {
    console.log('remove')
  })
  .parse(process.argv)

if(program.args.length === 0) {
  program.help()
}
