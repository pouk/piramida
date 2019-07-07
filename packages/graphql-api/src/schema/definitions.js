const { gql } = require('apollo-server')

const typeDefs = gql`
  type Mutation {
    createAgent(input: CreateAgentInput!): CreateAgentPayload
  }

  input CreateAgentInput {
    name: String!
    brokerId: ID!
  }

  type CreateAgentPayload {
    agent: Agent!
  }

  interface Broker {
    id: ID!
    name: String!
  }

  type Superagent implements Broker {
    id: ID!
    name: String!
  }

  type Agent implements Broker {
    id: ID!
    name: String!
    level: Int!
    brokerId: ID!
  }

  type Query {
    brokers: [Broker!]!
    broker(id: ID!): Broker
  }
`

module.exports = typeDefs
