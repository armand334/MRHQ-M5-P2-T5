require('dotenv').config();

var createError = require('http-errors');
var express = require('express');

const mongoose = require("mongoose");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var getStationsRouter = require('./routes/stations');
var getGeocodesRouter = require('./routes/geocodes');
var distanceRouter = require('./routes/distance');
var testRouter = require('./routes/test');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/m5');

app.use('/', indexRouter);
app.use('/stations', getStationsRouter);
app.use('/geocodes', getGeocodesRouter);
app.use('/distance', distanceRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
}).on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error("Port is already in use");
  } else {
    console.error("Server Error:", error);
  }
});

module.exports = app;
