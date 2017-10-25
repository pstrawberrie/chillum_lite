const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// Controllers
const dashboardController = require('../controllers/dashboardController');
const screenController = require('../controllers/screenController');

/* Dashboard */
router.get('/', catchErrors(dashboardController.default));

/* Screens */
router.get('/screen/:name', catchErrors(screenController.default));
router.post('/newscreen', catchErrors(screenController.newScreen));

module.exports = router;
