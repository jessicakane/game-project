import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreContextProvider = ({children}) => {

    const storedUserHighScore = localStorage.getItem('highScore');
    const [userHighScore, setUserHighScore] = useState(storedUserHighScore || false)

    const addNewScore = async(score) => {

    }

    const checkIfHighScore = async(score) => {

    }

    return (
        <ScoreContext.Provider value={
            {
                userHighScore,
                setUserHighScore,
                addNewScore,
                checkIfHighScore
            }
        }>
            {children} </ScoreContext.Provider>
    )
}

export {
    ScoreContext
};
