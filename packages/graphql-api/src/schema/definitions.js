const { gql } = require('apollo-server')

const typeDefs = gql`
  type Mutation {
    createAgent(input: CreateAgentInput!): CreateAgentPayload
  }

  input CreateAgentInput {
    brokerId: ID!
  }

  type CreateAgentPayload {
    agent: Agent!
  }

  interface Broker {
    id: ID!
  }

  type Superagent implements Broker {
    id: ID!
  }

  type Agent implements Broker {
    id: ID!
    level: Int!
    brokerId: ID!
  }

  type Query {
    brokers: [Broker!]!
  }
`

module.exports = typeDefs
