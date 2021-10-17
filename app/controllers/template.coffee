export default (app, opts, next) ->

  # INDEX
  app.get '/', (req, res) ->
    res.send 'Get all customers'


  # SHOW
  app.get '/:id', (req, res) ->
    res.send 'Get customer ' + req.params.id


  # EDIT
  app.get '/:id/edit', (req, res) ->
    res.send 'Edit customer ' + req.params.id


  # NEW
  app.get '/new', (req, res) ->
    res.send 'New customer'


  # CREATE
  app.post '/', (req, res) ->
    console.log req.body
    res.send 'Created customer'


  # UPDATE
  app.patch '/:id', (req, res) ->
    console.log req.body
    res.send 'Updated customer ' + req.params.id


  # DESTROY
  app.delete '/:id', (req, res) ->
    res.send 'Deleted customer ' + req.params.id
  

  next()