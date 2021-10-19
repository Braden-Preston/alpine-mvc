customer = require('../controllers/customer')

export default (app, opts, next) ->

  app.get    '/',         customer.index
  app.get    '/:id',      customer.show
  app.get    '/:id/edit', customer.edit 
  app.get    '/new',      customer.new
  app.post   '/',         customer.create
  app.patch  '/:id',      customer.update
  app.delete '/:id',      customer.delete

  next()