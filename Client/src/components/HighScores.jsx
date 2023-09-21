import { useContext } from 'react';
import { StyledHighScores, StyledHighScoreH2, StyledTable } from './styles/styledHighScores';
import '../css/HighScores.css';

const HighScores = () => {
    
    return (<div className="high-scores">
        <h2>High Scores</h2>
        <table>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>&#129351;</td>
                    <td>Jess</td>
                    <td>9000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>&#129352;</td>
                    <td>Dror</td>
                    <td>7000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>&#129353;</td>
                    <td>Lukas</td>
                    <td>5000</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td></td>
                    <td>Yehuda</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td></td>
                    <td>Yonatan</td>
                    <td>1000</td>
                </tr>
            </tbody>
        </table>
    </div>);
};

export default HighScores;