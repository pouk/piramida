function createAgent (_, args, ctx) {
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

module.exports = {
  createAgent
}
