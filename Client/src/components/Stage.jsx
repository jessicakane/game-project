import React, { useEffect } from 'react';
import { Cell } from './Cell';
import { StyledStage } from './styles/styledStage';

export const Stage = ({ stage }) => {
  useEffect(() => {
    console.log(stage);
    console.log(stage[0].length);
    console.log(stage.length)
  }, [])
  return (
    <StyledStage className="styled-stage" width={stage[0].length} height={stage.length}>
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
  )
}
