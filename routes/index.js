var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', (req, res, next) => {
  models.users
  .findAll({
    where: {
      Deleted: null
    }
  })
      .then(usersFound => {
    res.render('users', {
      users: usersFound
    });
  });
});



module.exports = router;
