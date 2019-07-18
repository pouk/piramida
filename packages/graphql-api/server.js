const createServer = require('.')

const server = createServer({
  brokers: []
})

server
  .listen()
  .then(info => {
    console.log(`Server running at ${info.url}`)
  })
