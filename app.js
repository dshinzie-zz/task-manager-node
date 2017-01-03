var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var models  = require('./models');

var app = express();

var methodOverride = require('method-override')
app.use(methodOverride('_method'));

//database connection
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('database_name', 'username', 'password', {
      dialect: "sqlite", // or 'sqlite', 'postgres', 'mariadb'
      host:    'localhost', // or 5432 (for postgres)
      storage: '../database_development.db'
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index); //this is for having route logic in different files
// app.use('/users', users);
app.get('/', function(req, res) {
  res.render('dashboard', { title: 'Task Manager'});
});

app.get('/tasks', function(req, res) {
  models.Task.findAll().then(function(tasks) {
    res.render('index', {
      tasks: tasks
    });
  });
});

app.get('/tasks/new', function(req, res) {
  res.render('new');
});

app.post('/tasks', function(req, res) {
  models.Task.create({
    title: req.body['task[title]'],
    description: req.body['task[description]']
  }).then(function(task) {
    res.redirect('/tasks');
  });
});

app.get('/tasks/:id', function(req, res) {
  models.Task.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(task) {
    res.render('show', {
      task: task
    });
  });
});

app.get('/tasks/:id/edit', function(req, res) {
  models.Task.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(task) {
    res.render('edit', {
      task: task
    });
  });
})

app.post('/tasks/:id', function(req, res) {
  models.Task.update(
    { title: req.body['task[title]'],
      description: req.body['task[description]']},
    { where: { id: req.params.id } }).then(function(task) {
    res.redirect(`/tasks/${req.params.id}`);
  });
})

app.delete('/tasks/:id', function(req, res) {
  models.Task.destroy(
    { where: { id: req.params.id }}
  ).then(function(task) {
    res.redirect('/tasks');
  });
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
