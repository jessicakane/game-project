import React, { useEffect } from 'react';
import { Cell } from './Cell';
import { StyledStage } from './styles/styledStage';
import HighScores from './HighScores';

export const Stage = ({ stage, showHighScores, finalScore, isNewRecord }) => {
  

  return (
    <StyledStage className="styled-stage" width={stage[0].length} height={stage.length}>
      {showHighScores && <HighScores finalScore={finalScore} isNewRecord={isNewRecord} />}
      {!showHighScores && stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
  )
}
