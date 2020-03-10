/*
  Main code of backend
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysqlDB = require('./db_connector');
const cors = require('cors');

// ========================================
//            ROUTER DECLARATION
// ========================================
// hakwon search by name
const searchByNameRouter = require('./routes/search/name');
// post contact data to DB
const contactParentRouter = require('./routes/contact/parent');
const contactCompanyRouter = require('./routes/contact/company');
const contactUsRouter = require('./routes/contact/us');
const contactListRouter = require('./routes/contact/list');
// post and get comment by DB
const getCommentRouter = require('./routes/academy/getComment');
const postCommentRouter = require('./routes/academy/postComment');
const deleteCommentRouter = require('./routes/academy/deleteComment');
// getting user information from DB
const getMyCommentRouter = require('./routes/user/comment');
// adding/deleting and checking bookmark
const bookmarkRouter = require('./routes/academy/bookmark');
const isBookmarkRouter = require('./routes/academy/isBookmark');

// ========================================
// express for routing
const app = express();

// ========================================
// default express port
const port = 3000;

// ========================================
// connection with database
mysqlDB.connect();

// ========================================
// app option for preventing cors
app.use(cors());

// app.options('/wirte', (req, res) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Max-Age', '3600')
//   res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Content-Length, X-Requested-With');
//   res.send();
// })

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
app.use('/api/contact/us', contactUsRouter);
app.use('/api/contact/list', contactListRouter);

// post and get comment
app.use('/api/academy/getComment', getCommentRouter);
app.use('/api/academy/postComment', postCommentRouter);
app.use('/api/academy/deleteComment', deleteCommentRouter);

// get user information
app.use('/api/user/comment', getMyCommentRouter);

// search academy by name
app.use('/api/search/name', searchByNameRouter);

// adding/deleting and checking bookmark
app.use('/api/academy/bookmark', bookmarkRouter);
app.use('/api/academy/isBookmark', isBookmarkRouter);

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