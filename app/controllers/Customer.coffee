export default (app, opts, next) ->

  app.get '/', (req, res) ->
    res.send 'Get all customers'


  app.get '/:id', (req, res) ->
    res.send 'Get customer ' + req.params.id

  
  next()