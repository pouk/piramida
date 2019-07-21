const { createApp } = require('.')

// Assets

const BROKERS = [
  { id: 'root', name: 'Admin' }
]

const PORT = 4000

// Init

const app = createApp({ brokers: BROKERS })

// Run
app.listen(PORT, err => {
  if (err) throw err

  const url = `http://localhost:${PORT}`
  console.log(`Server running at ${url}`)
})
