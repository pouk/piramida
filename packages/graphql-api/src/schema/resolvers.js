module.exports = {
  Query: {
    brokers (_, args, ctx) {
      return ctx.brokers
    }
  },
  Mutation: {
    createAgent (_, args, ctx) {
      const { brokerId } = args.input

      // build agent model
      const agent = {
        id: `agent-${Date.now()}`,
        level: 1,
        brokerId
      }

      // "save" to brokers store
      ctx.brokers.push(agent)

      return { agent }
    }
  },
  Broker: {
    __resolveType (obj) {
      return (obj.level === void 0)
        ? 'Superagent'
        : 'Agent'
    }
  }
}
