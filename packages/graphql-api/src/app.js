const debug = require('debug')('piramida:app')

const Koa = require('koa')

const { ApolloServer } = require('apollo-server-koa')

const schema = require('./schema')

//

function createApp ({ brokers } = {}) {
  debug('init Koa app')
  const app = new Koa()

  debug('enhance app context w/ brokers list')
  app.context.brokers = brokers || []

  debug('init Apollo GraphQL server')
  const server = new ApolloServer({
    schema,
    context: ({ ctx }) => ctx
  })

  debug('use Apollo as Koa middleware')
  server.applyMiddleware({ app })

  return app
}

module.exports = createApp
