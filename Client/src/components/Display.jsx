import React from 'react';
import { StyledDisplay } from './styles/styledDisplay';

export const Display = ({ gameOver, text }) => {
  return (
    <StyledDisplay gameover={gameOver}>{text}</StyledDisplay>
  )
}
