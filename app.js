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
const bodyParser = require("body-parser");

// ========================================
// express for routing
const app = express();

// ========================================
// app option for preventing cors
const corsOption = {
  origin: true,
  methods: ["POST", "GET"],
  credentials: true,
  maxAge: 3600
}
app.use(cors(corsOption));

// ========================================
//            ROUTER DECLARATION
// ========================================
const initialSearchRouter = require('./routes/api/search');                 // initial search by condition
const nameSearchRouter = require('./routes/api/namesearch');                // search by name
const academyInfoRouter = require('./routes/api/info');                     // academy class information api
const idToAcademyRouter = require('./routes/api/id');                       // id -> academy

const getCommentRouter2 = require('./routes/api/comment/getComment');       // get comment from db
const deleteCommentRouter2 = require('./routes/api/comment/deleteComment'); // delete comment from db
const likeCommentRouter2 = require('./routes/api/comment/likeComment');     // like comment from db
const postCommentRouter2 = require('./routes/api/comment/postComment');     // post comment to db
const numCommentRouter2 = require('./routes/api/comment/numComment');       // get number of comment from db

const checkBookmarkRouter2 = require('./routes/api/bookmark/isBookmark');   // check if academy is already bookmarked
const bookmarkRouter2 = require('./routes/api/bookmark/bookmark');          // bookmark or unbookmark

const myBookmarkRouter2 = require('./routes/api/bookmark/myBookmark');      // get my bookmark list
const myCommentRouter = require('./routes/api/comment/myComment');          // get my comment

const paySuccessRouter = require('./routes/api/learningtest/paySuccess');   // save payment info
const testValidRouter = require('./routes/api/learningtest/testValid');     // check if user is valid

const storeTestRouter = require('./routes/api/learningtest/testend');       // store learning test result
const getRecentTestRouter = require('./routes/api/learningtest/gettest');   // get recent learing test result

const AuthRouter = require('./routes/auth/apple');                          // apple login callback & endpoint

// ========================================
// connection with database
mysqlDB.connect();

// ========================================
// apple login settings
app.use(bodyParser.urlencoded({ extended: false }));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

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
app.use('/api2/search/init', initialSearchRouter);                // initial search by condition
app.use('/api2/search/name', nameSearchRouter);                   // search by name
app.use('/api2/classinfo', academyInfoRouter);                    // academy class information api
app.use('/api2/search/id', idToAcademyRouter);                    // id -> academy

app.use('/api2/comment/get', getCommentRouter2);                  // get comment from db
app.use('/api2/comment/delete', deleteCommentRouter2);            // delete comment from db
app.use('/api2/comment/like', likeCommentRouter2);                // like comment from db
app.use('/api2/comment/post', postCommentRouter2);                // post comment to db
app.use('/api2/comment/num', numCommentRouter2);                  // get number of comment from db

app.use('/api2/bookmark/check', checkBookmarkRouter2);            // check if academy is already bookmarked
app.use('/api2/bookmark/mark', bookmarkRouter2);                  // bookmark or unbookmark

app.use('/api2/bookmark/my', myBookmarkRouter2);                  // get my bookmark list
app.use('/api2/comment/my', myCommentRouter);                     // get my comment

app.use('/api2/test/paysuccess', paySuccessRouter);               // save payment info
app.use('/api2/test/valid', testValidRouter);                     // check if user is valid

app.use('/api2/test/end', storeTestRouter);                       // store learning test result
app.use('/api2/test/recent', getRecentTestRouter);                // get recent learing test result

app.use('/auth', AuthRouter);                                     // apple login callback & endpoint

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