function brokers (_, args, ctx) {
  return ctx.brokers
}

function broker (_, args, ctx) {
  return ctx.brokers
    .find(broker => broker.id === args.id)
}

module.exports = {
  broker,
  brokers
}
