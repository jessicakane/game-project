const {createNewScore} = require('../models/scoreModels');
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

  module.exports = {createNewScoreController}