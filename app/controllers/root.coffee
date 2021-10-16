export default (app, opts, next) ->    

  app.get '/', (req , res) ->
    res.type 'text/html'
    res.send """
            <html>
              <head>
              <link rel="stylesheet" type="text/css" href="/app.css" />
              </head>
              <body>
                <h2>this is an example app</h2>
              </body>
            </html>
            """


  app.get '/test', (req, res) ->
    res.send 'Test!'
      
  
  next()