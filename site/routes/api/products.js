const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsController')

router.get('/list', productsApiController.list);

router.get('/paginated', productsApiController.paginatedProducts);


module.exports = router;