const {Score} = require('../schemas/scoresSchema'); 

async function createNewScore(scoreData) {
  try {
      const score = Score.create(scoreData)
      return score;
  } catch (error) {
    console.error('Error creating score:', error);
    throw error;
  }
}

module.exports = {createNewScore};