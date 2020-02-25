/*
  Main code of backend
*/

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysqlDB = require('./db_connector');

// ========================================
//            ROUTER DECLARATION
// ========================================
// index page router (needs modify)
const indexRouter = require('./routes/index');
// account management files' router
const joinRouter = require('./routes/account/signup');
const loginRouter = require('./routes/account/login');
// notice bulletin board router
const noticeRouter = require('./routes/notice/notice');
// hakwon search by name
const searchByNameRouter = require('./routes/search/name');
// post contact data to DB
const contactParentRouter = require('./routes/contact/parent');
const contactCompanyRouter = require('./routes/contact/company');
const contactUsRouter = require('./routes/contact/us');

// ========================================
// express for routing
const app = express();

// CORS middleware option setting for security ( only allowed server request )
const whitelist = [
  'http://hakwongo.com',
  'http://localhost:3000', // TODO : localhost is for debugging
] 
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback (new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

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
app.use(cors(corsOptions));

// ========================================
//            ROUTER ROUTING
// ========================================
// contact for parents and company
app.use('/api/contact/parent', contactParentRouter);
app.use('/api/contact/company', contactCompanyRouter);
app.use('/api/contact/us', contactUsRouter);

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