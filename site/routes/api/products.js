const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsController')

router.get('/list', productsApiController.list);


module.exports = router;