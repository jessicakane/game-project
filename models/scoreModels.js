const {Score} = require('../schemas/scoresSchema');
const {getUserNameById} = require('./userModels');
const mongoose = require('mongoose');


async function createNewScore(scoreData) {
  try {
      const score = Score.create(scoreData)
      return score;
  } catch (error) {
    console.error('Error creating score:', error);
    throw error;
  }
}

async function getHighScores() {
    try {
      const highestScores = await Score.find().sort({ score: -1 }).limit(5); 
      const scoresForReturn = [];
      for (const score of highestScores) {
        const userName = await getUserNameById(score.userId);
        const scoreObj = {
            userName: userName,
            score: score.score,
            date: score.date
        }
        scoresForReturn.push(scoreObj)
      }
      return scoresForReturn;
    } catch (err) {
      console.error('Error fetching highest scores:', err);
      throw err;
    }
  }

async function getUsersHighScores(userId) {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const objectId = new ObjectId(userId);
        const highScores = await Score.find({ userId: objectId }).sort({score: -1}).limit(5);
        return highScores;
        } catch (error) {
            console.error('Error fetching users high scores:', error)
            throw error;
        }
}

module.exports = {createNewScore, getHighScores, getUsersHighScores};