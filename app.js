require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var path = require('path');
const compression = require("compression");
const helmet = require("helmet");


//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var messagesRouter = require('./routes/messages');


var app = express();

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
});

//connect to mongodb 
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


//session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

//initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up logging middleware
app.use(logger('dev'));

// Parse incoming requests with JSON payload
app.use(express.json());

// Parse incoming requests with URL-encoded payload
app.use(express.urlencoded({ extended: false }));

// Parse cookies
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

//set up middleware to expose currentUser to views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(compression()); // Compress all routes
app.use(helmet());
app.use(limiter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/messages', messagesRouter);

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
