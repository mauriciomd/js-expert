import { InjectHttpInterceptor } from '../index.js';
InjectHttpInterceptor();

import http from 'http'

function handleRequest(request, response) {
  response.end('Hello World')
}

const server = http.createServer(handleRequest)
const port = 3000

server.listen(port, () => console.log(`Server running at ${server.address().port}`))