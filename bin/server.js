#!/usr/bin/env node

const http = require('http')
const fs = require('fs')
const opn = require('opn')
const os = require('os')
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

opn(`http://${myHost}:7777`)
console.log(`Server running at http://${myHost}:7777`.grey)
