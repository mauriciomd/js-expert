const http = require('http')

const DEFAULT_USER = {
  login: 'validLogin',
  password: 'validPassword'
}

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact us page')

    return res.end()
  },

  '/login:post': async (req, res) => {
    // request is an iterator
    for await (const data of req) {
      const user = JSON.parse(data)
      if (user.login !== DEFAULT_USER.login || user.password !== DEFAULT_USER.password) {
        res.writeHead(401)
        res.write('Login failed')

        return res.end()
      } 
      
      res.write('Login has been succeeded')
      return res.end()
    }
  },

  default: (req, res) => {
    res.write('Hello World')

    return res.end()
  }
}

const handler = function (request, response) {
  const { url, method } = request
  const routeKey = `${url}:${method.toLowerCase()}`

  const chosenRoute = routes[routeKey] || routes.default
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  return chosenRoute(request, response)
}

const app = http
            .createServer(handler)
            .listen(3000, () => console.log('app running at port 3000'))

module.exports = app