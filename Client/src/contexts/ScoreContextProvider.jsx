import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ScoreContext = createContext();

export const ScoreContextProvider = ({ children }) => {
  const storedUserHighScore = localStorage.getItem('highScore');
  const [userHighScore, setUserHighScore] = useState(
    storedUserHighScore || false
  );
  const [users5Scores, setUsers5Scores] = useState(false);

  const addNewScore = async (score) => {
    try {
      await axios.post('http://localhost:8080/api/scores/newscore', score);
      return true;
    } catch (error) {
      console.error('Error creating score');
      return false;
    }
  };

  const checkIfHighScore = (score) => {
    console.log('high score is', userHighScore);
    if (score.score > userHighScore) {
      const newScore = {
        highScore: score.score,
        userId: score.userId,
      };
      return updateUserScore(newScore);
    }
    return false;
  };

  const updateUserScore = async (score) => {
    try {
      await axios.put('http://localhost:8080/api/users/updatescore', score);
      setUserHighScore(score.highScore);
      localStorage.setItem('highScore', score.highScore);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchHighScores = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/scores/highscores'
      );
      const highScores = res.data;
      console.log(highScores);
      return highScores;
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchUsersScores = async(userId) => {
  //     try {
  //         const res = await axios.get(`http://localhost:8080/api/scores/usersscores/${userId}`);
  //         const highScores = res.data;
  //         console.log('users scores are', highScores);
  //         return highScores;
  //         } catch(error) {
  //             console.error(error)
  //         }
  // }

  const fetchUsersScores = async (userId) => {
    console.log(userId);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/scores/usersscores/${userId}`
      );
      const highScores = res.data;
      console.log(highScores);
      // Loop through highScores and format the date for each item
      const formattedHighScores = highScores.map((scoreObj) => {
        const originalDate = new Date(scoreObj.date); // Assuming the date is stored in the 'date' property of each score object

        const options = {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        };

        const formattedDate = originalDate.toLocaleDateString('en-US', options);

        // Create a new object with the formatted date
        const formattedScore = {
          score: scoreObj.score,
          date: formattedDate, // Update the 'date' property with the formatted date
        };

        return formattedScore;
      });

      console.log('users scores with formatted dates are', formattedHighScores);

      // Set the state with the new array of high scores
      setUsers5Scores(formattedHighScores);
      return formattedHighScores;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsersLatestScore = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/scores/${userId}`);
      const latestScore = res.data;
      console.log('users latest score is:', latestScore);
      return latestScore;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        userHighScore,
        setUserHighScore,
        addNewScore,
        checkIfHighScore,
        updateUserScore,
        fetchHighScores,
        fetchUsersScores,
        fetchUsersLatestScore,
        users5Scores,
      }}
    >
      {children}{' '}
    </ScoreContext.Provider>
  );
};

export { ScoreContext };
