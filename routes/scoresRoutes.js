const express = require('express');
const router = express.Router();

const scoreControllers = require('../controllers/scoreControllers');

router.post('/newscore', scoreControllers.createNewScoreController);

module.exports = router;