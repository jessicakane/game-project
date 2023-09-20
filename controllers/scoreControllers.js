const {createNewScore, getHighScores, getUsersHighScores, getLatestScore} = require('../models/scoreModels');
const mongoose = require('mongoose');

const createNewScoreController = async(req, res) => {
    try {
      const newScore = req.body;
      const userObjectId = new mongoose.Types.ObjectId(newScore.userId);
      newScore.userId = userObjectId;
      await createNewScore(newScore);
      res.status(201).json({ message: 'New score added successfully' });
    } catch(error) {
      console.log(error);
      res.status(500).send(error.message)
    }
  }

const getHighScoresController = async(req, res) => {
    try {
        const highScores = await getHighScores();
        res.status(201).json(highScores)
    } catch(error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}

const getUsersHighScoresController = async(req, res) => {
    try {
        
        const highScores = await getUsersHighScores(req.params.userId);
        res.status(201).json(highScores);
    } catch(error) {
        console.error(error);
        res.status(500).send(error.message)
    }
}

const getLatestScoreController = async(req, res) => {
    try {
        const latestScore = await getLatestScore(req.params.userId);
        res.status(201).json(latestScore);
    } catch(error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

  module.exports = {createNewScoreController, getHighScoresController, getUsersHighScoresController, getLatestScoreController}