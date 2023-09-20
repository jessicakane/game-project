import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreContextProvider = ({children}) => {

    const storedUserHighScore = localStorage.getItem('highScore');
    const [userHighScore, setUserHighScore] = useState(storedUserHighScore || false)

    return (
        <ScoreContext.Provider value={
            {
                userHighScore,
                setUserHighScore
            }
        }>
            {children} </ScoreContext.Provider>
    )
}

export {
    ScoreContext
};
