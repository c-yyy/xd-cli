#!/usr/bin/env node
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

console.log(chalk.green(`--IPv4--:${myHost}`))
