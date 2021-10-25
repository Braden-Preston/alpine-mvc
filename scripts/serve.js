let path = require('path')
let chalk = require('chalk')
let chokidar = require('chokidar')
let pinoColada = require('pino-colada')
let livereload = require('livereload')
let fastify = require('fastify')
let assert = require('assert')
let split = require('split2')
let pump = require('pump')

let useWatch = process.argv.includes('-w')

// Read the .env file
require('dotenv').config()

const state = {
  server: null,
  sockets: []
}

// Custom server settings
let options = {
  logger: {
    level: 'info',
    stream: split(pinoColada())
  }
}

// Pipe pino logger output to terminal
pump(options.logger.stream, process.stdout, assert.ifError)

function pathCheck(id) {
  return (
    id.startsWith(path.resolve('.app/server.js')) ||
    id.startsWith(path.resolve('.app/views'))
  )
}

if (useWatch) {
  // Instantly reload CSS & JS
  let hmr = livereload.createServer()
  hmr.watch(path.resolve('.app'))

  // Refresh page on server code change
  hmr.server.once('connection', () => {
    setTimeout(() => {
      hmr.refresh('/')
    }, 100)
  })
}

async function start() {
  // Create a server instance
  const app = fastify(options)

  // Import the fastify app as a plugin
  app.register(require('../.app/server'))

  // Start the app
  app.listen(process.env.PORT || 3000, err => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })

  // Store HTTP server instance
  state.server = app.server
  state.server.on('connection', socket => {
    state.sockets.push(socket)
  })
}

function restart() {
  Object.keys(require.cache).forEach(
    id => pathCheck(id) && delete require.cache[id]
  )

  // Restart the HTTP server
  state.sockets.forEach(socket => !socket.destroyed && socket.destroy())
  state.server.close(() => start())
  state.sockets = []
}

async function serve() {
  start()

  useWatch &&
    chokidar.watch(['.app/server.js', '.app/views']).on('change', async () => {
      console.log(chalk.blue('Server reloaded'))
      restart()
    })
}

module.exports = serve()
