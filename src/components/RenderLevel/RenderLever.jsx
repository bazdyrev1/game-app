import React, { useState } from "react";
import { GAME_LEVELS } from "../levels/levels";
import useAnimationFrame from '../animation/Animation'
import { CoinBlock, EmptyBlock, LavaDrippingBlock, LavaHorizontalBlock, LavaStaticBlock, LavaVerticalBlock, Row, UserBlock, WallBlock, Wrapper } from "./style";

const RenderLevel = () => {
  const [position, setPosition] = useState({coin: 5,
    lavaDripping: 0,
    lavaVertical: 0,
    lavaHorizontal: 0,
  })
  const gameLevel = GAME_LEVELS[0].trim().split("\n");
  let angle = 0;
  let lastTime = null;

  const wallPosition = [];
  console.log(wallPosition)


  useAnimationFrame(deltaTime => {

    if (lastTime != null) angle += deltaTime * 0.009;
    lastTime = deltaTime;

   

    setPosition((prevState => ({
      ...prevState,
      coin: (Math.sin(angle) * 5),
      lavaDripping: ((prevState.lavaDripping + deltaTime * 0.01) % 100),
      lavaVertical: (Math.sin(angle) * 5),
      lavaHorizontal: (Math.sin(angle) * 15),
    })))
    
  })


  return (
    <Wrapper>
      {gameLevel.map((row, index1) => {
        const numberRow = wallPosition.push({row: index1});
        return (
          <Row key={index1}>
            {row.split("").map((item,index) => {
              if (item === ".") {
                return <EmptyBlock key={index}/>;
              } else if (item === "#") {
                return <WallBlock key={index}/>;
                
              } else if (item === "+") {
                return <LavaStaticBlock key={index}/>;
              } else if (item === "@") {
                return <UserBlock key={index}/>;
              } else if (item === "o") {
                return <CoinBlock key={index} position={position.coin}/>;
              } else if (item === "=") {
                return <LavaHorizontalBlock key={index} position={position.lavaHorizontal}/>;
              } else if (item === "v") {
                return <LavaDrippingBlock key={index} position={position.lavaDripping}  />;
              } else if (item === "|") {
                return <LavaVerticalBlock key={index} position={position.lavaVertical} />;
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
