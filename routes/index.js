var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  models.Task.findAll().then(function(tasks){
    res.render('dashboard', {
      title: "Task Manager",
      tasks: tasks
    });
  });
});

module.exports = router;
