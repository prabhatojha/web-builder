var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const mongoose=require('mongoose');
var bodyparser = require('body-parser');
var app = express();
// mongoose.connect('mongodb://localhost/First');
// mongoose.Promise=global.Promise;
var indexRouter = require('./routes/project');
var imageRouter = require('./routes/image');
var fontRouter = require('./routes/fonts');
global.fetch = require('node-fetch');
app.use(bodyparser.json());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '31556952000',
    etag: true // Will enable cache for static content, by default is also true
}));
// Add all the routes here
app.use('/api/projects', indexRouter);
app.use('/api/images', imageRouter);
app.use('/api/fonts', fontRouter);
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// catch 404 and forward to error handler
// app.use((req, res) => {
//   res.sendFile(__dirname + 'build/public/index.html');
// });
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
