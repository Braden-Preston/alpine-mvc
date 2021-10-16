# Import Modules
fs         = require 'fs'
path       = require 'path'
middie     = require 'middie'
kill       = require 'kill-port'
livereload = require 'livereload'

# Globals
publicPath = path.join __dirname, '..', 'public'


# Instant refresh for assets & server
startReloading = () ->
  await kill(35729)

  hmr = livereload.createServer();
  hmr.watch(publicPath);

  hmr.once 'error', (err) -> refresh.refresh '/'

  hmr.server.once 'connection', () -> 
    setTimeout () -> hmr.refresh '/', 100

startReloading()


# Fastify Main App Entry 
export default (app, opts) ->

  # Register Middleware
  await app.register require 'middie'
  app.use require('connect-livereload')()
  app.use require('cors')()

  # Register Plugins
  app.register require('fastify-static'), {
    root: publicPath
  }

  # Assign all Routes
  app.register require './router.coffee'