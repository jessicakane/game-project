import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    color: ${props => (props.gameover ? 'red' : '#999')};
    font-family: 'Audiowide', Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    background: rgba( 0, 0, 0, 0.6 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border-radius: 10px;`

//background: #000;
//border: 4px solid #333;
