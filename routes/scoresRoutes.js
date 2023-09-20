const express = require('express');
const router = express.Router();

const scoreControllers = require('../controllers/scoreControllers');

router.post('/newscore', scoreControllers.createNewScoreController);
router.get('/highscores', scoreControllers.getHighScoresController);
router.post('/usersscores', scoreControllers.getUsersHighScoresController)

module.exports = router;