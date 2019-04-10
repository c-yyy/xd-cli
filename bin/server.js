#!/usr/bin/env node

const http = require('http')
const fs = require('fs')
const open = require('open')
const os = require('os')
const chalk = require('chalk')

function getIPAdress() {
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}
const myHost = getIPAdress()
const rootPath = process.cwd()
const argv = process.argv.splice(2)[0]
const reg = /^\d{4}$/
if(!reg.test(argv)) {
    console.log(chalk.red('请输入四位数字'))
    return
}

http.createServer((req, res) => {
    const url = req.url
    const file = url === '/' ? rootPath + '/index.html' : rootPath + url

    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html;charset="utf-8'
            })
            res.write('<h1>404</h1><p>访问页面不存在</p>')
            res.end()
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html;charset="utf-8'
            })
            res.write(data.toString())
            res.end()
        }
    })
}).listen(7777)

open(`http://${myHost}:${argv?argv:7777}`)
console.log(chalk.grey(`Server running at http://${myHost}:${argv?argv:7777}`))
