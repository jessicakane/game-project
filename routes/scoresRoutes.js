const express = require('express');
const router = express.Router();

const scoreControllers = require('../controllers/scoreControllers');

router.post('/newscore', scoreControllers.createNewScoreController);
router.get('/highscores', scoreControllers.getHighScoresController)

module.exports = router;