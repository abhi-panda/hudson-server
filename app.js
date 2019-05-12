var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const db = require('./db.js');
var routes = require('./routes/routes');
const createError = require('http-errors');
var compression = require('compression');
var helmet = require('helmet');


var app = express();
app.use(compression());
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
if (app.get('env')=== 'development') {
  app.locals.pretty = true;
}

app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hudson', routes);
app.use('/index',(req,res,next)=>{
  return res.render('index');
})
app.use((req,res,next) => {
  return next(createError(404, 'Page / File Not Found'))
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.locals.status = err.status || 500;
  res.status(err.status || 500);
  return res.render('error');
});

module.exports = app;