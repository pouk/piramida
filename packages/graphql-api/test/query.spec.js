import test from 'ava'

import { ApolloServer, gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

import { schema } from '..'

//

const MOCKS = require('./mocks.json')

//

const QUERY_AGENTS = gql`
  query {
    brokers {
      id
      name
      ... on Agent {
        level
        brokerId
      }
    }
  }
`

const QUERY_BROKER = gql`
  query ($id: ID!) {
    broker (id: $id) {
      id
      name
      ... on Agent {
        level
        brokerId
      }
    }
  }
`

// hooks

test.beforeEach(async t => {
  const server = new ApolloServer({
    schema,
    context: MOCKS
  })
  const client = createTestClient(server)

  t.context = {
    client,
    server
  }
})

// tests

test('brokers', async t => {
  const { query } = t.context.client

  const checkResponse = (res) => {
    t.deepEqual(res.data.brokers, MOCKS.brokers)
  }

  await query({ query: QUERY_AGENTS })
    .then(checkResponse)
})

test('broker', async t => {
  const { client } = t.context

  const checkResponse = (res) => {
    t.deepEqual(res.data.broker, MOCKS.brokers[0])
  }

  await client
    .query({
      query: QUERY_BROKER,
      variables: { id: 'root' }
    })
    .then(checkResponse)
})
