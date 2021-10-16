# Import Modules
fs         = require 'fs'
path       = require 'path'
middie     = require 'middie'

# Globals
publicPath = path.join __dirname, '..', 'public'


# Fastify Main App Entry 
export default (app, opts) ->

  # Register Middleware
  await app.register require 'middie'
  app.use require('cors')()

  # Register Plugins
  app.register require('fastify-static'), {
    root: publicPath
  }

  # Assign all Routes
  app.register require './router.coffee'