const express = require('express');
const router = express.Router();

const controller = require('../controllers/mainController')

/* GET home page. */
router.get('/', controller.home);

/* GET landing page. */
router.get('/landing', controller.landing);

router.post('/mensaje', controller.mensaje);

module.exports = router;

