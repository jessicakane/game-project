import styled from 'styled-components';

const StyledHighScores = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'Audiowide', Pixel, Arial, Helvetica, sans-serif;
    `;

const StyledHighScoreH2 = styled.h2`
    font-size: 2em;
    color: yellow;
    `;

const StyledTable = styled.table`
    font-size: 1em;
    background-color: white;
    width: 80%;
`;

export { StyledHighScores, StyledHighScoreH2, StyledTable };