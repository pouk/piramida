import test from 'ava'

import Debug from 'debug'

import fetch from 'node-fetch'

import getPort from 'get-port'

import Koa from 'koa'

import { ApolloServer } from 'apollo-server-koa'

import schema from '../src/schema'

import { createApp } from '..'

// Assets

const BROKERS = [
  { id: 'root', name: 'Admin' }
]

// Helpers

const debug = Debug('piramida:exo')

const runServer = (app, port) => {
  const listener = resolve => app.listen({ port }, resolve)
  return new Promise(listener)
}

// tests

test('koa - embedded', async t => {
  const app = new Koa()
  debug('created Koa app')

  app.context.brokers = BROKERS

  const server = new ApolloServer({
    schema,
    context: ({ ctx }) => ctx
  })
  server.applyMiddleware({ app })

  const port = await getPort()
  debug('reserved port: %d', port)

  await runServer(app, port)

  const baseUrl = `http://localhost:${port}`
  debug('koa app runnin on %s', baseUrl)

  const graphqlUrl = `${baseUrl}/graphql`
  debug('graphql api available at %s', graphqlUrl)

  // client setup

  const query = `
    query ListBrokers {
      brokers {
        id
        name
      }
    }
  `

  //
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ query })
  }

  const { data } = await fetch(graphqlUrl, params)
    .then(r => r.json())

  const expected = {
    brokers: BROKERS
  }

  t.deepEqual(data, expected)
})

