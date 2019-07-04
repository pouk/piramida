const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    agents: [Agent]
  }

  type Agent {
    id: ID!
  }
`

module.exports = typeDefs
