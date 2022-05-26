var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const sesionController = require('./controllers/sesionController');
const usuariosController = require('./controllers/usuariosController');
const alumnosController = require('./controllers/alumnosController');
const maestroController = require('./controllers/maestroController');
const grupoModel = require('./controllers/grupoController');
const padresFamiliaController = require('./controllers/padresFamiliaController');
const calificacionesController =  require('./controllers/calificacionesController');

const seguridadSesion = require('./security/auth'); 

var app = express();
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));
//Se establece conexion con la base de datos
var mongoose = require('./config/database');
mongoose.conexionDB();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', seguridadSesion.authAdmin, indexRouter);
app.use('/', sesionController);
app.use('/usuarios', usuariosController);
app.use('/alumnos', seguridadSesion.authAdmin, alumnosController);
app.use('/maestro', seguridadSesion.authAdmin, maestroController );
app.use('/grupos', seguridadSesion.authAdmin, grupoModel);
app.use('/home-padres-familia', seguridadSesion.auth, padresFamiliaController);
app.use('/calif', calificacionesController);

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
