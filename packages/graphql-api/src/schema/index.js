const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('./resolvers')
const typeDefs = require('./definitions')

const schema = makeExecutableSchema({ typeDefs, resolvers })

// expose executable schema

module.exports = schema
