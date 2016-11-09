const express = require('express');
const router = express.Router();
const Post = require('../models/guestpost');
const User = require('../models/users');



//display all user entries
router.route("/")
  .get(ensureAuthenticated, (req, res, next) => {
    Post.find({}, {}, (e, data) => {
      if(e) throw e;

      //send db entries to browser
      res.render('guestbook', {
        title: "GBdoover",
        entries: data
      });
    });
  })

  //save user
  .post((req, res) => {
    let guestEntry = new Post(req.body);
    guestEntry.save();
    res.redirect('/guestbook');
  });

//delete user
router.get('/:id', (req, res) => {
  let userId = req.params.id;
  Post.findByIdAndRemove(userId, (e, data) => {
    if(e) throw e;
    res.redirect('/guestbook');
  });
});

//user single entry
router.get('/guest/:username', (req, res) => {
  let username = req.params.username;
  Post.findOne({username: username}, (e, data) => {
    if(e) throw e;
    res.render('guestentry', {entry: data});
  });
});

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/users/login');
  }
};

module.exports = router;
