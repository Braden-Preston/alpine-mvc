template = require('../controllers/template')

export default (app, opts, next) ->

  app.get    '/',         template.index
  app.get    '/:id',      template.show
  app.get    '/:id/edit', template.edit 
  app.get    '/new',      template.new
  app.post   '/',         template.create
  app.patch  '/:id',      template.update
  app.delete '/:id',      template.delete

  next()