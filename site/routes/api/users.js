const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersController');

router.get('/list', usersApiController.list);

router.post('/addcart', usersApiController.addcart);


module.exports = router;