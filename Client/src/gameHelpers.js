export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
    return (
    Array.from(Array(STAGE_HEIGHT), () => 
    new Array(STAGE_WIDTH).fill([0, 'clear'])))}


export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
    for (let y = 0; y < player.tetromino.length; y+=1) {
        for (let x = 0; x < player.tetromino[0].length; x+=1) {
            // check we're on a tetro cell
            if (player.tetromino[y][x] !== 0) {
                //check that we haven't left the stage horizontally or vertically
                if (
               y + player.pos.y + moveY >= 20 || x + player.pos.x + moveX < 0 || x + player.pos.x + moveX >= 12)
                //check that cell we're moving to isn't set to clear
                {return true} else if (
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                return true
                }
            }
        }
    }
    return false;
}
