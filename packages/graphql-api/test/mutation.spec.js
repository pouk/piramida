import test from 'ava'

import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'

import createServer from '..'

//

const MOCKS = require('./mocks.json')

//

const MUTATION_CREATE_AGENT = gql`
  mutation ($input: CreateAgentInput!) {
    createAgent (input: $input) {
      agent {
        id
        name
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

test('createAgent', async t => {
  const { mutate } = t.context.client

  const input = {
    name: 'Agent #2',
    brokerId: 'root'
  }

  const checkResponse = (res) => {
    const { agent } = res.data.createAgent

    t.not(agent.id, undefined, 'generate id')
    t.is(agent.level, 1, 'start from level 1')
    t.is(agent.brokerId, input.brokerId, 'broker id as set')
  }

  const req = {
    query: MUTATION_CREATE_AGENT,
    variables: { input }
  }

  await mutate(req)
    .then(checkResponse)
})
