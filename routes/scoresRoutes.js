const express = require('express');
const router = express.Router();

const scoreControllers = require('../controllers/scoreControllers');

router.post('/newscore', scoreControllers.createNewScoreController);
router.get('/highscores', scoreControllers.getHighScoresController);
router.get('/usersscores/:userId', scoreControllers.getUsersHighScoresController);
router.get('/:userId', scoreControllers.getLatestScoreController);


module.exports = router;