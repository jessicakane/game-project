import React, { useEffect } from 'react';
import { Cell } from './Cell';
import { StyledStage } from './styles/styledStage';
import HighScores from './HighScores';
import { StyledMiniStage } from './styles/styledMiniStage';

export const MiniStage = ({ miniStage }) => {
 

  return (
    <StyledMiniStage className="styled-stage" width={miniStage[0].length} height={miniStage.length}>
        {miniStage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
      
    </StyledMiniStage>
  )
}