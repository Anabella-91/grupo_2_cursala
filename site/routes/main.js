const express = require('express');
const router = express.Router();


const controller = require('../controllers/mainController');

/* GET home page. */
router.get('/home', controller.home);

/* GET landing page. */
router.get('/', controller.landing);

router.post('/mensaje', controller.mensaje);

module.exports = router;

