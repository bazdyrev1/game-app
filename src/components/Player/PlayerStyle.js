import styled from "styled-components";

export const Wrapper = styled.div`

`
export const PlayerBlock = styled.div`
  min-width       : 20px;
  min-height      : 20px;
  background-color: black;
  position: relative;
  top: ${props => props.position.posX + 'px' || '0px'};
  left: ${props => props.position.posY + 'px' || '0px'};
`