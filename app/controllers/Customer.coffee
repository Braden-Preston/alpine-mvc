module.exports = {

  index: (req, res) ->
    res.send 'Get all customers'


  show: (req, res) ->
    res.send 'Get customer ' + req.params.id


  edit: (req, res) ->
    res.send 'Edit customer ' + req.params.id


  new: (req, res) ->
    res.send 'New customer'


  create: (req, res) ->
    console.log req.body
    res.send 'Created customer'


  update: (req, res) ->
    console.log req.body
    res.send 'Updated customer ' + req.params.id


  delete: (req, res) ->
    res.send 'Deleted customer ' + req.params.id

}