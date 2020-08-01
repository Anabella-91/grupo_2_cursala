const express = require('express');
const router = express.Router();

const controller = require('../controllers/adminController');

router.get('/mensajes', controller.mostrar);

module.exports = router;