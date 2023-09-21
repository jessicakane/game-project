import React, { useContext, useEffect, useState, useRef } from 'react';
import { Stage } from '../Stage';
import { Display } from '../Display';
import { StartButton } from '../StartButton';
import { StyledTetris } from '../styles/styledTetris';
import { StyledTetrisWrapper } from '../styles/styledTetris';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import { createStage } from '../../gameHelpers';
import { checkCollision } from '../../gameHelpers';
import { useInterval } from '../../hooks/useInterval';
import { useGameStatus } from '../../hooks/useGameStatus';
import { ScoreContext } from '../../contexts/ScoreContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';

export const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const { addNewScore, checkIfHighScore } = useContext(ScoreContext);
    const { userId, token } = useContext(AuthContext);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    const [showHighScores, setShowHighScores] = useState(false);
    const [isNewHighScore, setIsNewHighScore] = useState(false);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, {
            x: dir,
            y: 0
        })) {

            updatePlayerPos({ x: dir, y: 0, collided: false })
        }
    }

    const startGame = () => { // reset everything
        setShowHighScores(false);
        setStage(createStage());
        setDropTime(1200);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);

            //increase speed
            setDropTime(1000 / (level + 1) + 200)
        }
        if (!checkCollision(player, stage, {
            x: 0,
            y: 1
        })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
            if (player.pos.y < 1) {

                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200)
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop()
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) { // left arrow
                movePlayer(-1);
            } else if (keyCode === 39) { // right arrow
                movePlayer(1);
            } else if (keyCode === 40) { // down arrow
                dropPlayer()
            } else if (keyCode === 38) {
                playerRotate(stage, 1)
            } else if (keyCode === 16) {
                playerRotate(stage, -1)
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)

    useEffect(() => {
        if (gameOver) {
            const scoreObj = {
                userId: userId,
                score: score
            }
            addNewScore(scoreObj);
            const isNewHighScoreRes = checkIfHighScore(scoreObj);
            setIsNewHighScore(isNewHighScoreRes);
            setShowHighScores(true);
        }
    }, [gameOver])


    return (
        <StyledTetrisWrapper className="tetris-wrapper" role="button" tabIndex="0" onKeyDown={e => move(e)}
            onKeyUp={keyUp}>
            <StyledTetris className="styled-tetris">
                <Stage className="stage" stage={stage} showHighScores={showHighScores} finalScore={score} isNewRecord={isNewHighScore} />
                <aside> {
                    gameOver ? <>
                        <Display text={`Score: ${score}`} /></> : <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                }
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

// we're getting the illusion of movement by clearing the cell where the shape previously was and coloring the next cell on an interval -- there are better ways to do this using animations if we have time
