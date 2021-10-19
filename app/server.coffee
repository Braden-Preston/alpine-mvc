# Import Modules
fs         = require 'fs'
path       = require 'path'
chalk      = require 'chalk'
middie     = require 'middie'
# killport   = require 'kill-port'
livereload = require 'livereload'

# Globals
serverPath = path.join __dirname, '../.server'
publicPath = path.join __dirname, '../.server/public'


startReloading = () -> 
  # Instantly reload CSS & JS
  hmr = livereload.createServer()
  hmr.watch(path.join(__dirname, '../.server'))


  # Reload browser on server change
  hmr.server.once("connection", () ->
    setTimeout(() -> 
      hmr.refresh("/")
    , 100)
  )

startReloading()


# Fastify Main App Entry 
export default (app, opts, done) ->
  # Start the database
  # await app.register require './db'

  # Register Middleware
  await app.register require 'fastify-express'
  app.use require('connect-livereload')()
  app.use require('cors')()

  # Register Plugins
  app.register require('fastify-static'), {
    root: publicPath
    prefix: '/dist/'
  }

  # Assign all Routes
  app.register require './router'

  console.log 'nodes'

  # Start Message
  console.log chalk.green 'Server is live @ http://localhost:3000'