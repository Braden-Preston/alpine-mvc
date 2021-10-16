# Import Modules
fs         = require 'fs'
path       = require 'path'

# Globals
publicPath = path.join __dirname, '..', 'public'


# Fastify Main App Entry 
export default (app, opts) ->

  # Register Middleware

  # Register Plugins
  app.register require('fastify-static'), {
    root: publicPath
  }

  # Assign all Routes
  app.register require './router.coffee'
