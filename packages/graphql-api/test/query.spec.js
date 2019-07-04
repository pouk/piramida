import test from 'ava'

import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

import createServer from '..'

//

const MOCKS = {
  agents: [
    { id: 'zero' }
  ]
}

//

const QUERY_AGENTS = gql`
  query {
    agents {
      id
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

test('agents', async t => {
  const { query } = t.context.client

  const checkResponse = ({ data }) => {
    t.deepEqual(data.agents, MOCKS.agents)
  }

  await query({ query: QUERY_AGENTS })
    .then(checkResponse)
})
