const createServer = require('.')

const server = createServer()

server
  .listen()
  .then(info => {
    console.log(`Server running at ${info.url}`)
  })
