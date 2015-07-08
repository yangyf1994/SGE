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


var app = express();
//mongodb
var dbURL = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/SGE';
var db = mongoose.connect(dbURL,{safe:true});
//controller
var announcementCtrl = require('./controllers/announcementCtrl');


app.set('port',process.env.PORT||3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(paginate.middleware(3, 50));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function (req,res) {
  res.render('index');
});
app.get('/announcements',announcementCtrl.announcement);

//api
app.get('/api/listArticle',announcementCtrl.listArticle);
app.post('/api/postArticle',announcementCtrl.postArticle);
app.delete('/api/deleteArticle/:_id',announcementCtrl.deleteArticle);

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
});

module.exports = app;
