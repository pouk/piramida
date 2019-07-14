function __resolveType (obj) {
  return (obj.level === void 0)
    ? 'Superagent'
    : 'Agent'
}

module.exports = {
  __resolveType
}
