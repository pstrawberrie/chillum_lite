const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// Controllers
const screenController = require('../controllers/screenController');

/* Dashboard */
router.get('/', catchErrors(screenController.landing));

/* Screens */
router.get('/screen/:name', catchErrors(screenController.default));
router.post('/screen/:name', catchErrors(screenController.saveScreen));
router.post('/newscreen', catchErrors(screenController.newScreen));

router.get('/screen/:name/live', catchErrors(screenController.default));

module.exports = router;
