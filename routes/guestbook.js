const express = require('express');
const router = express.Router();
const Post = require('../models/guestpost');


//display all user entries
router.route("/")
  .get((req, res) => {
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
    console.log(data);
    res.redirect('/guestbook');
  });
});

//user single entry
router.get('/guest/:username', (req, res) => {
  let lol = req.params.username;
  Post.findOne({username: lol}, (err, data) => {
    if(err) throw err;

    res.render('guestentry', {entry: data});
  });
});


module.exports = router;
