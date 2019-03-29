#!/usr/bin/env node

const http = require('http')

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('helloworld')
}).listen(7777)

console.log('Server running at http://localhost:7777')
