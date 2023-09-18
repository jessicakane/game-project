import React from 'react';
import { Stage } from '../Stage';
import { Display } from '../Display';
import { StartButton } from '../StartButton';
import { createStage } from '../../gameHelpers';
import { StyledTetris } from '../styles/styledTetris';
import { StyledTetrisWrapper } from '../styles/styledTetris';

export const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage = {createStage()}/>
        <aside>
            <div>
            <Display text = "Score" />
            <Display text = "Rows" />
            <Display text = "Level" />
            </div>
            <StartButton/>
        </aside>
        </StyledTetris>
    </StyledTetrisWrapper>
  )
}
