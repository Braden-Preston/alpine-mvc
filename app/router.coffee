root     = require('./controllers/root.coffee')
customer = require('./controllers/customer.coffee')

# Top-level router
#
# Paths are given a controller collection to handle requests
export default (app, opts, next) ->

  app.register root, { prefix: '/'}
  app.register customer, { prefix: '/customers' }

  next()

  