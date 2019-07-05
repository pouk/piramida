import test from 'ava'

import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

import createServer from '..'

//

const MOCKS = {
  brokers: [
    {
      id: 'root'
    },
    {
      id: 'node1-1',
      level: 0,
      brokerId: 'root'
    }
  ]
}

//

const QUERY_AGENTS = gql`
  query {
    brokers {
      id
      ... on Agent {
        level
        brokerId
      }
    }
  }
`

// hooks

test.beforeEach(async t => {
  const server = createServer(MOCKS)
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
