/*
  Main code of backend
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysqlDB = require('./db_connector');

// ========================================
//            ROUTER DECLARATION
// ========================================
// index page router (needs modify)
var indexRouter = require('./routes/index');
// account management files' router
var joinRouter = require('./routes/account/signup');
var loginRouter = require('./routes/account/login');
// notice bulletin board router
var noticeRouter = require('./routes/notice/notice');
// hakwon search by name
var searchByNameRouter = require('./routes/search/name');
// post contact data to DB
var contactParentRouter = require('./routes/contact/parent');
var contactCompanyRouter = require('./routes/contact/company');

// ========================================
// express for routing
var app = express();

// ========================================
// default express port
const port = 3000;

// ========================================
// connection with database
mysqlDB.connect();

// ========================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-history-api-fallback')());

// ========================================
//            ROUTER ROUTING
// ========================================
// contact for parents and company
app.use('/api/contact/parent', contactParentRouter);
app.use('/api/contact/company', contactCompanyRouter);

app.use('/api/account/signup', joinRouter);
app.use('/api/account/login', loginRouter);
app.use('/api/notice/list', noticeRouter);
app.use('/api/search/name', searchByNameRouter);
app.use('/', indexRouter);

// ========================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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