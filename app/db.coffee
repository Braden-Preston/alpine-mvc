plugin        = require('fastify-plugin')
{ Sequelize, DataTypes } = require('sequelize')


# Registers the database
export default plugin (app, opts, next) ->

  { DB_NAME, DB_HOST, DB_USER, DB_PASS } = process.env

  db = new Sequelize DB_NAME, DB_USER, DB_PASS, { host: DB_HOST, dialect: 'postgres'}

  # Test the connection
  try
    await db.authenticate()
    console.log "Connected to database, #{DB_NAME}"
  catch err
    console.error "Could not authenticate with database, #{DB_NAME}"

  User = db.define('User', {
    firstName: {
      type: DataTypes.STRING,
    },
    initial: {
      type: DataTypes.CHAR,
    }
    lastName: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'users'
  })

  console.log User
  console.log db.models

  await db.sync({ alter: true })  
   
  await User.create({ firstName: 'John', lastName: 'Due'})  

  console.log 'done'

  # Globally provide the database
  app.decorate 'db', db

  # Always close the database
  app.addHook 'onClose', (app, done) ->
    db.close()
      .then(done)
      .catch(done)

  next()
  