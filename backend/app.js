var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctors');
var chartRouter = require('./routes/chartmanagement');
var requestRouter = require('./routes/request');
var settingsRouter = require('./routes/settings');
var reportsRouter = require('./routes/report');
var tipsRouter = require('./routes/tips');
var app = express();

const connection = mongoose.connect('mongodb://localhost:27017/isee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
connection.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(cors())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctor', doctorRouter);
app.use('/chart', chartRouter);
app.use('/request', requestRouter);
app.use('/settings', settingsRouter);
app.use('/report', reportsRouter);
app.use('/tip', tipsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
