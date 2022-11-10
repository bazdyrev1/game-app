import React, { useState, useCallback } from "react";

import { motionControllerHorizontal,
  motionControllerVertical
} from './suggestions'
import useAnimationFrame from '../animation/Animation'
import UserBlock from '../Player/Player'
import LavaHorizontal from "../LavaHorizontal/LavaHorizontal";

import { CoinBlock,
 EmptyBlock, 
 LavaDrippingBlock, 
 LavaStaticBlock, 
 LavaVerticalBlock, 
 Row,
 WallBlock, 
 Wrapper 
} from "./style";



const RenderLevel = ({ gameLevel, lavaPosition, wallPosition, playerStartPosition }) => {
  const [position, setPosition] = useState({
    coin          : 5,
    lavaDripping  : 0,
    lavaVertical  : 0,
    lavaHorizontal: lavaPosition.map(item => {

      return {
        ...item,
        'pos'      : 0,
        'direction': 1,
      }
    }),
    player: {...playerStartPosition, posX: 0, posY: 0, direction: {x: 0, y: 0}, action: 0},
  })
  
  const [arithmetic, setArithmetic] = useState({
    lava: position.lavaHorizontal.map(item => {
      return {
        ...item,
        direction: 1,
      }}),
    player: position.player
  });

  let angle    = 0;
  let lastTime = null;
  
  const main = useCallback((deltaTime) => {
  if (lastTime != null) angle += deltaTime * 0.009;
  lastTime = deltaTime;

  setPosition((prevState => ({
    ...prevState,
    coin          : (Math.sin(angle) * 5),
    lavaDripping  : ((prevState.lavaDripping + deltaTime * 0.01) % 100),
    lavaVertical  : (Math.sin(angle) * 5),
    lavaHorizontal: prevState.lavaHorizontal.map(item => {
      let permission = false;
      arithmetic.lava.forEach(item1 => {
        if (item1.id === item.id) {
          item1.direction ? permission = true : permission = false;
        }
      })
      return {
        ...item,
        'pos': permission ? item.pos + deltaTime * 0.04: item.pos - deltaTime * 0.04
      }
    }),
    player: {
      ...prevState.player,
      posX: motionControllerVertical(arithmetic.player, prevState.player, deltaTime),
      posY: motionControllerHorizontal(arithmetic.player, prevState.player, deltaTime)
    },
  })
  ))
}, [position.player]);

  useAnimationFrame(main); 

  return (
    <Wrapper>
      {gameLevel.map((row, index1) => {

        return (
          <Row key={index1}>
            {row.split("").map((item, index) => {
              if (item === ".") {
                return <EmptyBlock key={index} />;
              } else if (item === "#") {
                return <WallBlock key={index} />;
              } else if (item === "+") {
                return <LavaStaticBlock key={index} />;
              } else if (item === "@") {
                return (
                  <UserBlock 
                    key={index} 
                    position= {position.player}
                    wallPosition  = {wallPosition}
                    setArithmetic = {setArithmetic}
                  />
                )
              } else if (item === "o") {
                return <CoinBlock key={index} position={position.coin} />;
              } else if (item === "=") {
                const currLavaPosition = position.lavaHorizontal.find(item => item.id === index1);
                const startLavaPos     = lavaPosition.find(item => item.id === index1)

                return (
                  <LavaHorizontal
                    key           = {index}
                    position      = {currLavaPosition}
                    lavaPosition  = {startLavaPos}
                    wallPosition  = {wallPosition}
                    setArithmetic = {setArithmetic}
                  />
                )
              } else if (item === "v") {
                return <LavaDrippingBlock key={index} position={position.lavaDripping} />;
              } else if (item === "|") {
                return <LavaVerticalBlock className='lavaVertical' key={index} position={position.lavaVertical} />;
              }
              return item;
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

export default RenderLevel;
