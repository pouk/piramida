const { importSchema } = require('graphql-import')

const SCHEMA_PATH = `${__dirname}/schema.graphql`

module.exports = importSchema(SCHEMA_PATH)
