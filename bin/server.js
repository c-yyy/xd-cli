#!/usr/bin/env node

const http = require('http')
const opn = require('opn')
const os = require('os')
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

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end()
}).listen(7777)

opn(`http://${myHost}:7777`)
console.log(`Server running at http://${myHost}:7777`)
