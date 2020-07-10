var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
const rememberMid = require('./middlewares/remember');
const sessionMid = require('./middlewares/session');



var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret : 'Cursala', 
  resave: false, 
  saveUninitialized: false
}));

// Middlewares
app.use(sessionMid);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));
app.use(methodOverride('_method'));

app.use(rememberMid);


app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


// Error 404
app.use((req, res, next) => {
    res.status(404).render('not-found', { title: '404 - Error'});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
