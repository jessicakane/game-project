import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const rotate = (matrix, dir) => {
        //transpose matrix
        const matrixT = matrix.map((_, index) => matrix.map(col => col[index]));
        //reverse each row
        if (dir>0) {
            return matrixT.map(row => row.reverse())
        }
        return matrixT.reverse()
    }

    const playerRotate = (stage, dir) => {
        const playerCopy = JSON.parse(JSON.stringify(player));
        playerCopy.tetromino = rotate(playerCopy.tetromino, dir);

        //make sure we don't rotate out of the frame

        const pos = playerCopy.pos.x;
        let offset = 1;
        while(checkCollision(playerCopy, stage, {x: 0, y: 0})) {
            playerCopy.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1))
            if (offset > playerCopy.tetromino[0].length) {
                rotate(playerCopy.tetromino, -dir);
                playerCopy.pos.x = pos;
                return;
            }
        }

        setPlayer(playerCopy)

    }

    const updatePlayerPos = ({x, y, collided}) => {
        
        setPlayer(prev => ({
            ...prev,
            pos: {
                x: (prev.pos.x + x), y: (prev.pos.y + y)
            },
            collided,
        }))
    }

    const resetPlayer = useCallback(() => {

        const prevTetro = JSON.stringify(player.tetromino);
        const newPlayer = {
            pos: {x: STAGE_WIDTH/2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        }
        while (JSON.stringify(newPlayer.tetromino) === prevTetro) {
            newPlayer.tetromino = randomTetromino().shape;
        }
        
        setPlayer(newPlayer)
    }, []) 



    return [player, updatePlayerPos, resetPlayer, playerRotate]
}