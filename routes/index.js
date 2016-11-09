const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: "GBdoover"});
});

module.exports = router;
