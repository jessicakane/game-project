import React from 'react';
import { StyledStartButton } from './styles/styledStartButton';

export const StartButton = ({callback}) => {
  return (
    <StyledStartButton onClick = {callback}>Start Game</StyledStartButton>
  )
}
