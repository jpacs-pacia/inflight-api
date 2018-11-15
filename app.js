

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var controller_files = [];
var controller_obj = {};
var app = express();

/*** SETTINGS ***/
global.appConfiguration = {
    'app_directory': path.resolve(__dirname),
    'app_model_directory': path.resolve(__dirname + '/models'),
    'app_sapphire_model_directory': path.resolve(__dirname + '/models/sapphire'),
    'app_configuration_directory': path.resolve(__dirname + '/models/config'),
};
// // socket.io set
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// // var ioclient = require('socket.io-client');
// io.on('connection', function (socket) {
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });

// server.listen(8080, function(){
//   console.log('listening on *:8080');
// });


// view engine setup
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', index);
// app.use('/users', users);

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
	controller_files = file.split('.');
  if(file.substr(-3) == '.js') {
      var controller_obj = require('./controllers/' + controller_files[0]);
      // route.controller(app);
       app.use('/' + controller_files[0], controller_obj);
  }
});
console.log('DIR NAME: ');
console.log(__dirname);
console.log('LOADING SAPPHIRE CONTROLLERS: ');
fs.readdirSync('./controllers/sapphire').forEach(function (file) {
  controller_files = file.split('.');
  if(file.substr(-3) == '.js') {
      var controller_obj = require('./controllers/sapphire/' + controller_files[0]);
      // route.controller(app);
       app.use('/' + controller_files[0], controller_obj);
       
       console.log(controller_files[0]);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
