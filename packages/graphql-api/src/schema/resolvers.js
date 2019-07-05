module.exports = {
  Query: {
    brokers (_, args, ctx) {
      return ctx.brokers
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
