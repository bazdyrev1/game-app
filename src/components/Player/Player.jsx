import React from "react";
import {Wrapper, PlayerBlock } from './PlayerStyle'

const Player = ({ position}) => {
console.log(position)

    return(
        <Wrapper>
            <PlayerBlock position={position}/>
        </Wrapper>
    )
}

export default Player;