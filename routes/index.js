const express = require('express');
const router = express.Router();

/* GET dashboard */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

module.exports = router;
