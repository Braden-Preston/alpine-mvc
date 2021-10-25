export default (app, opts, done) ->    

  app.get '/', (req , res) ->
    res.type 'text/html'
    res.send """
            <html>
              <head>
              <link rel="stylesheet" type="text/css" href="/dist/app.css" />
              <script type="module" src="/dist/app.js"></script>
              </head>
              <body>
                <h2>this is an example app</h2>
              </body>
            </html>
            """

  app.get '/test', (req, res) ->
    res.send 'Test!'


  app.get '/pug', (req, res) ->
    res.type 'text/html'
    res.view('dashboard', {
      cat: 'kittens'
    })
      
  
  done()