const { ApolloServer } = require('apollo-server')

const schema = require('./src/schema')

// expose factory

module.exports = context =>
  new ApolloServer({ schema, context })

