const express = require('express');
const router = express.Router();

/* GET dashboard */
const dashboardController = require('../controllers/dashboardController');
router.get('/', dashboardController.default);

/* GET screen1 */
const screenController = require('../controllers/screenController');
router.get('/screen1', screenController.default);

module.exports = router;
