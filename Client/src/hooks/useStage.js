import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        const updateStage = prevStage => {
            //flush stage
            //if this is too slow, for loops will be faster than map
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)))

             //draw the tetromino
             console.log(player.tetromino);

            player.tetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    newStage[y + player.pos.y][x + player.pos.x] = [
                        value,
                        player.collided ? 'merged' : 'clear'
                    ]
                }
            })
        })
        // check if we collided
        if (player.collided) {
            resetPlayer();
        }
        return newStage;

        }
        
        setStage(prev => updateStage(prev))

    }, [player, resetPlayer])

    return [stage, setStage];
}