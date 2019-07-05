const { gql } = require('apollo-server')

const typeDefs = gql`
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
