const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.post('/createuser', userControllers.createNewUserController);

module.exports = router;