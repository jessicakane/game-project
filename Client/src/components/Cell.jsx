import React from 'react';
import { StyledCell } from './styles/styledCell';
import { TETROMINOS } from '../tetrominos';

export const Cell = ( {type } ) => {
  return (
    <StyledCell type = {type} color = {TETROMINOS[type].color}></StyledCell>
  )
}
