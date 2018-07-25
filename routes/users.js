var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
const passport = require('passport');
const connectEnsure = require('connect-ensure-login');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//profile/:id ////////

router.get('/profile/:id', connectEnsure.ensureLoggedIn(), function(req, res) {
  if (req.user.UserId === parseInt(req.params.id)) {
      res.render('profile', {
        FirstName: req.user.FirstName,
        LastName: req.user.LastName,
        Email: req.user.Email,
        UserId: req.user.UserId,
        Username: req.user.Username
      });
    } else {
      res.send('This is not your profile');
    }
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        FirstName: req.body.firstName, 
        LastName: req.body.lastName, 
        Email: req.body.email,
        Username: req.body.username,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/users/login');
      } else {
        res.send('user already exists');
      }
    });
});



router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {     
  failureRedirect: '/users/login'   }),   
  function (req, res, next) {     
      res.redirect('profile/' + req.user.UserId);   
      } 
    ); 


    router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/users/login');
    });

/////ADMIN SECTION //on index

router.get('/', (req, res, next) => {

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

router.get('/:id', (req, res) => {
  let userId = req.params.id;
  models.users
  .find({
    where: 
    {
      UserId: userId
    },
  })
  .then(user => {
    res.render('specificUser', {
      UserId: user.UserId,
      Username: user.Username,
      FirstName: user.FirstName,
      LastName: user.LastName, 
      Email: user.Email
    });
  });
});

router.delete('/:id/delete', (req, res) => {
  let userId = parseInt(req.params.id);
  models.users
  .update(
    {
      Deleted: 'true'
    },
    {
      where: {
       UserId: userId
      }
    }
  )
  .then(user => {
    res.redirect('/users');
  });
});

module.exports = router;
