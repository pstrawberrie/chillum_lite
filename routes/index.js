const express = require('express');
const router = express.Router();

// Controllers
const dashboardController = require('../controllers/dashboardController');
const screenController = require('../controllers/screenController');

/* GET dashboard */
router.get('/', dashboardController.getAllScreens, dashboardController.default);
router.post('/newscreen', dashboardController.newScreen);

/* GET a screen */
router.get('/screen/:name', screenController.getScreen, screenController.default);

module.exports = router;
