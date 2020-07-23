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
const searchByExactNameRouter = require('./routes/search/exactname');
const searchByIDRouter = require('./routes/search/id');
const idToNameRouter = require('./routes/search/idname');
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
const getMyBookmarkRouter = require('./routes/user/bookmark');
// adding/deleting and checking bookmark
const bookmarkRouter = require('./routes/academy/bookmark');
const isBookmarkRouter = require('./routes/academy/isBookmark');

// new api ================
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
app.use('/api/user/bookmark', getMyBookmarkRouter);

// search academy by name
app.use('/api/search/name', searchByNameRouter);
app.use('/api/search/exactname', searchByExactNameRouter);
app.use('/api/search/id', searchByIDRouter);
app.use('/api/search/idname', idToNameRouter);

// adding/deleting and checking bookmark
app.use('/api/academy/bookmark', bookmarkRouter);
app.use('/api/academy/isBookmark', isBookmarkRouter);

// new api ================
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