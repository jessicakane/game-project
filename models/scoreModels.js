const {Score} = require('../schemas/scoresSchema');
const {getUserNameById} = require('./userModels') 


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

module.exports = {createNewScore, getHighScores};