import { createContext, useContext, useState } from "react";
import axios from 'axios';

const ScoreContext = createContext();

export const ScoreContextProvider = ({children}) => {

    const storedUserHighScore = localStorage.getItem('highScore');
    const [userHighScore, setUserHighScore] = useState(storedUserHighScore || false)

    const addNewScore = async(score) => {
        try {
            await axios.post('http://localhost:8080/api/scores/newscore', score)
            return true;
        } catch (error) {
            console.error('Error creating score');
            return false;
        }
    }

    const checkIfHighScore = (score) => {
        console.log('high score is', userHighScore)
        if (score.score > userHighScore) {
            const newScore = {
                highScore: score.score,
                userId: score.userId
            }
            return updateUserScore(newScore);
        }
        return false
    }

    const updateUserScore = async(score) => {
        try {
            await axios.put('http://localhost:8080/api/users/updatescore', score)
            setUserHighScore(score.highScore);
            localStorage.setItem('highScore', score.highScore);
            return true;
        } catch(error) {
            console.error(error)
            return false;
        }
    }

    return (
        <ScoreContext.Provider value={
            {
                userHighScore,
                setUserHighScore,
                addNewScore,
                checkIfHighScore,
                updateUserScore
            }
        }>
            {children} </ScoreContext.Provider>
    )
}

export {
    ScoreContext
};
