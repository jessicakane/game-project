import React from 'react';
import { StyledDisplay } from './styles/styledDisplay';

export const Display = ({ gameOver, text }) => {
  return (
    <StyledDisplay gameover={gameOver}>
      {!Array.isArray(text)
        ? text
        : text &&
          text.length > 0 && (
            <div>
              Your Top Scores:
              {text.map((scoreObj) => (
                <div>
                  <span>{scoreObj.score}</span> <span>{scoreObj.date}</span>{' '}
                </div>
              ))}
            </div>
          )}
    </StyledDisplay>
  );
};
