# Top-level router
#
# Paths are given a control to handle requests
export default (app, opts, next) ->

	app.get '/', (req , res) ->
		res.type 'text/html'
		res.send '<h3>test</h3>'


# module.exports = function (app, opts, next) {
#   app.get("/", async function (req, res) {
#     console.log(Object.keys(req.id));
#     res.type('text/html')
#     res.send(`d
#       <html>
#         <head>
#         <link rel="stylesheet" type="text/css" href="/app.css" />
#         </head>
#         <body>
#           <p>this is an example app</p>
#         </body>
#       </html>
#     `)
#   });

#   app.get("/test", async function (req, res) {
#     return "This is another test";
#   });

#   next()
# };
