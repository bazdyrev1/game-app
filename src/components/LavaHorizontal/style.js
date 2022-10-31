import styled from "styled-components";

export const Wrapper = styled.div` 
min-width:20px;
min-height:20px;
background-color: red;
position: relative;
right: ${props => props.position + 'px' || '0px'}
`