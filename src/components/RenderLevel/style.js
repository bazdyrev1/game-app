import styled from "styled-components";

export const Wrapper = styled.div`
`
export const Row = styled.div`
  display: flex;
  width  : 700px;`

export const EmptyBlock = styled.div`
  min-width : 20px;
  min-height: 20px;
 `
export const WallBlock = styled.div` 
  min-width       : 20px;
  min-height      : 20px;
  background-color: white;
`
export const LavaStaticBlock = styled.div` 
  min-width       : 20px;
  min-height      : 20px;
  background-color: red;
`

export const CoinBlock = styled.div` 
  min-width       : 20px;
  min-height      : 20px;
  background-color: yellow;
  position        : relative;
  top             : ${props => props.position + 'px' || '0px'};

`
export const LavaVerticalBlock = styled.div` 
  min-width       : 20px;
  min-height      : 20px;
  background-color: red;
  position        : relative;
  top             : ${props => props.position + 'px' || '0px'}
`
export const LavaDrippingBlock = styled.div.attrs({
  className: 'lavaDripping',
})` 
  min-width       : 20px;
  min-height      : 20px;
  background-color: red;
  position        : relative;
  top             : ${props => props.position + 'px' || '0px'}
`
