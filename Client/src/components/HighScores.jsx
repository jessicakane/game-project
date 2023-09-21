import { useState, useEffect, useContext } from 'react';
import { StyledHighScores, StyledHighScoreH2, StyledTable } from './styles/styledHighScores';
import '../css/HighScores.css';
import { ScoreContext } from '../contexts/ScoreContextProvider';

const HighScores = () => {

    const { fetchHighScores } = useContext(ScoreContext);
    const [highScoresArr, setHighScoresArr] = useState([]);

    useEffect(() => {
        (async () => {
            const topFiveScores = await fetchHighScores();
            setHighScoresArr(topFiveScores);
        })();
    }, []);

    return (<div className="high-scores">
        {highScoresArr.length === 5 && <><h2>High Scores</h2>
            <table>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>&#129351;</td>
                        <td>{highScoresArr[0].userName}</td>
                        <td>{highScoresArr[0].score}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>&#129352;</td>
                        <td>{highScoresArr[1].userName}</td>
                        <td>{highScoresArr[1].score}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>&#129353;</td>
                        <td>{highScoresArr[2].userName}</td>
                        <td>{highScoresArr[2].score}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                        <td>{highScoresArr[3].userName}</td>
                        <td>{highScoresArr[3].score}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td></td>
                        <td>{highScoresArr[4].userName}</td>
                        <td>{highScoresArr[4].score}</td>
                    </tr>
                </tbody>
            </table></>}
    </div>);
};

export default HighScores;