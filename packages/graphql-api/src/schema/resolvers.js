module.exports = {
  Query: {
    brokers (_, args, ctx) {
      return ctx.brokers
    },
    broker (_, args, ctx) {
      return ctx.brokers
        .find(broker => broker.id === args.id)
    }
  },
  Mutation: {
    createAgent (_, args, ctx) {
      const { name, brokerId } = args.input

      // build agent model
      const agent = {
        id: `agent-${Date.now()}`,
        level: 1,
        name,
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
