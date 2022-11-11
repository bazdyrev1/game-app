import React, { useState, useCallback, useRef } from "react";

import {
  motionControllerHorizontal,
  motionControllerVertical
} from './suggestions'
import useAnimationFrame from '../animation/Animation'
import UserBlock from '../Player/Player'
import LavaHorizontal from "../LavaHorizontal/LavaHorizontal";

import {
  CoinBlock,
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
    coin: 5,
    lavaDripping: 0,
    lavaVertical: 0,
    lavaHorizontal: lavaPosition.map(item => {

      return {
        ...item,
        'pos': 0,
        'direction': 1,
      }
    }),
    player: { ...playerStartPosition, posX: 0, posY: 0, direction: { x: 0, y: 0 }, action: 0 },
  })
  
  const ref = useRef()
  let angle = 0;
  let lastTime = null;

  const main = useCallback((deltaTime) => {
    
    angle += deltaTime * 0.009;
    lastTime = deltaTime;

    setPosition((prevState => ({
      ...prevState,
      coin: (Math.sin(angle) * 5),
      lavaDripping: ((prevState.lavaDripping + deltaTime * 0.01) % 100),
      lavaVertical: (Math.sin(angle) * 5),
      lavaHorizontal: prevState.lavaHorizontal.map(item => {
        if (item.direction) {
          return {
            ...item,
            pos: item.pos + deltaTime * 0.04
          }
        }
        else {
          return {
            ...item,
            pos: item.pos - deltaTime * 0.04
          }
        }
      }),
      player: {
        ...prevState.player,
        posX: motionControllerVertical(position.player, prevState.player, deltaTime),
        posY: motionControllerHorizontal(position.player, prevState.player, deltaTime)
      },
    })
    ))

  }, [position.player]);
  ref.current = position.player;
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
                  setPosition = {setPosition}
                  refData = { ref.current}
                />
                )
              } else if (item === "o") {
                return <CoinBlock key={index} position={position.coin} />;
              } else if (item === "=") {
                const currLavaPosition = position.lavaHorizontal.find(item => item.id === index1);
                const startLavaPos = lavaPosition.find(item => item.id === index1)

                return (
                  <LavaHorizontal
                    key={index}
                    position={currLavaPosition}
                    lavaPosition={startLavaPos}
                    wallPosition={wallPosition}
                    setPosition={setPosition}
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
