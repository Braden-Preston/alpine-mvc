root     = require('./routes/root')
customer = require('./routes/customer')

# Top-level router
#
# Paths are given a controller collection to handle requests
export default (app, opts, done) ->

  app.register root, { prefix: '/'}
  app.register customer, { prefix: '/customers' }

  done()

  