const express = require('express');
const realNameController = require('../controller/realNameController');
const router = express.Router();
const isAuthenticated = require('../common/isAuthenticated');


/* GET users listing. */
router.get('/realname', isAuthenticated, realNameController);
module.exports = router;
