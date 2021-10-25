# Import Modules
fs         = require 'fs'
path       = require 'path'
chalk      = require 'chalk'
middie     = require 'middie'
killport   = require 'kill-port'

# Globals
serverPath = path.join __dirname, '../.app'
publicPath = path.join __dirname, '../.app/public'


# Fastify Main App Entry 
export default (app, opts, done) ->
  # Start the database
  # await app.register require './db'

  # Register Middleware
  await app.register require 'middie'
  app.use require('connect-livereload')()
  app.use require('cors')()

  # Server static assets and bundles
  app.register require('fastify-static'), {
    root: path.join __dirname, 'public'
    prefix: '/'
  }
  app.register require('fastify-static'), {
    root: path.join __dirname, 'dist'
    decorateReply: false
    prefix: '/dist/'
  }

  # Register pug template engine
  app.register require('point-of-view'), {
    root: path.join __dirname, 'views'
    engine:
      pug: require 'pug'
  }

  # Assign all Routes
  app.register require './routes'