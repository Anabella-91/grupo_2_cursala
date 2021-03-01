const express = require('express')
const path = require('path')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')


const app = express()


// Llamamos a las rutas
const mainRouter = require('./routes/main')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const adminRouter = require('./routes/admin')

// Configuración de plantillas EJS
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Configuración de sesión para los users
app.use(session({
  secret : 'CursalaSession', 
  cookie: { maxAge: 30000 },
  resave: false,
  saveUninitialized: false
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../public')))
app.use(methodOverride('_method'))

// Inicializamos las rutas
app.use('/', mainRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/admin', adminRouter)



// Manejo de errores
app.use((req, res, next) => {
    res.status(404).render('not-found', { title: '404 - Error'})
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
