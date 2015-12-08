var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var usuarioa = session.usuarioNombre;

function getApp(db)
{
  var apiGeneral = require('./routes/apiGeneral.js')(db);
  var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

  app.use(session({
    'resave': true,
    'saveUninitialized': true,
    'secret':'cookie_secret',
    'usuarioId':'nasi',
    'usuarioNombre':'nasi'
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get("/registrar",function(req,res){
  res.render("registrar",{});
})

function checkAuth(req, res, next) {
      if (!req.session.usuarioId) {
         res.send('No estas autorizado para ver esta pagina...Kwm');
      } else {
       next();
      }
  }

app.get("/mindex",checkAuth,function(req,res){

  console.log(req.session.usuarioId);
  res.render("indexm",{});
})


app.get("/contactanos",function(req,res){
  res.render("contactanos",{});
})



app.get('/ejemplo', function(req, res){
   if(req.session.usuarioNombre){


      res.send('Hola ' + req.session.usuarioNombre);
   }else{
      var nombre = 'Tito';
      req.session.usuarioNombre = nombre;
      res.send('Hola usuario desconocido. De ahora en adelante te llamaremos ' + nombre);
   }
});
app.get("/removeSesion", function(req, res){
       //eliminamos las sesiones y redirigimos
       req.session.destroy();
       res.redirect('/');
       location.reload();
   });

app.get("/registro",function(req,res){

  res.render("registro",{});
})



app.get("/login", function(req, res){
  res.render("login");
});

app.get("/l",function(req,res){

  res.render("l",{});
});
app.get("/h",function(req,res){

      console.log(req.session.usuarioNombre);
  res.render("h",{});
});


console.log("Conected To DB" + db.databaseName);
// catch 404 and forward to error handler
app.use('/api',apiGeneral);

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
return app;
}


module.exports = getApp;
