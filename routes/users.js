const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

router.route('/login')
  .get((req, res) => {
    res.render('login', {title: 'Login'})
  })
  .post(passport.authenticate('local', {failureRedirect: '/users/login'}), (req, res) => {
    res.redirect('/guestbook');
  });

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));



router.route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    var newUser = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    User.findOne({username: req.body.username}, (e, user) => {
      if(e) throw e;
      if(!user) {
        newUser.save();
        res.redirect('/users/login');
      } else {
        res.redirect('/users/register');
      }
    });
  });


module.exports = router;
