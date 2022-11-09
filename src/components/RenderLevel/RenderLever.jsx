import React, { useState, useRef, useCallback } from "react";

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

const RenderLevel = ({ gameLevel, lavaPosition, wallPosition, playerStartPosition, folloButtons }) => {
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

  const initialValuesLava = position.lavaHorizontal.map(item => {
    return {
      ...item,
      direction: 1,
    }
  })
  const intialValuePlayer = position.player;

  const [arithmetic, setArithmetic] = useState({lava: initialValuesLava, player: intialValuePlayer});
  const ref                         = useRef();

  let angle    = 0;
  let lastTime = null;

  // console.log(arithmetic.player)
  const motionControllerHorizontal = (player, prevSatePlayer, deltaTime ) => {
    if((player.direction.y === 0) && player.action){
     return  prevSatePlayer.posY - deltaTime * 0.04 
    }
    
    if((player.direction.y === 1) && player.action){
      return  prevSatePlayer.posY + deltaTime * 0.04 
     }
     return prevSatePlayer.posY
  };
  const motionControllerVertical = (player, prevSatePlayer, deltaTime ) => {
    if((player.direction.x === 1) && player.action){
     return  prevSatePlayer.posX + deltaTime * 0.06 
    }
    
    if((player.direction.x === 0) && player.action){
      return prevSatePlayer.posX - deltaTime * 0.5
     }
     return prevSatePlayer.posX
  }
  // console.log(arithmetic.player)
  useAnimationFrame(
    useCallback((deltaTime) => {
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
    }, [arithmetic])
  )

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
                    key           = {Math.random()}
                    position      = {currLavaPosition}
                    lavaPosition  = {startLavaPos}
                    wallPosition  = {wallPosition}
                    setArithmetic = {setArithmetic}
                  />
                )
              } else if (item === "v") {
                return <LavaDrippingBlock ref={ref} key={index} position={position.lavaDripping} />;
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
