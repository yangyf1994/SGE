var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var paginate = require('express-paginate');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var config = require('./config')();

var app = express();
//mongodb
var dbURL = config.mongoUrl;
var db = mongoose.connect(dbURL,{safe:true});
//controller
var announcementCtrl = require('./controllers/announcementCtrl');
var galleryCtrl = require('./controllers/galleryCtrl');
var contactCtrl = require('./controllers/contactCtrl');

app.set('port',config.port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(paginate.middleware(5, 50));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function (req,res) {
  res.render('index');
});
app.get('/announcements',announcementCtrl.announcement);
app.get('/gallery',galleryCtrl.gallery);
app.get('/contact',contactCtrl.contact);

//api
app.get('/api/listArticle',announcementCtrl.listArticle);
app.post('/api/postArticle',announcementCtrl.postArticle);
app.delete('/api/deleteArticle/:_id',announcementCtrl.deleteArticle);
app.post('/api/contact-message',contactCtrl.receiveMessage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);
server.listen(app.get('port'),function () {
  console.info('server listening on port: '+ app.get('port'));
  console.info('mode: '+ config.mode);
});

module.exports = app;
