const express = require('express');
const router = express.Router();

/* GET dashboard */
const dashboardController = require('../controllers/dashboardController');
router.get('/', dashboardController.default);

module.exports = router;
