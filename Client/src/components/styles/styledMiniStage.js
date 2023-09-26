import styled from 'styled-components';

export const StyledMiniStage = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height},
        calc(7vw/${props => props.width}));
        grid-template-columns: repeat(${props => props.width}, 1fr);
        grid-gap: 1px;
        border: 2px solid #333;
        width: 100%;
        max-width: 25%;
        padding: 0;
        background: #111;
        margin-left: 20%;
        
    `;
