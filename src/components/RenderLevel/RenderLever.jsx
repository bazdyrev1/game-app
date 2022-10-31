import React, { useState, useRef, useCallback } from "react";
import useAnimationFrame from '../animation/Animation'
import { CoinBlock, EmptyBlock, LavaDrippingBlock, LavaStaticBlock, LavaVerticalBlock, Row, UserBlock, WallBlock, Wrapper } from "./style";
import LavaHorizontal from "../LavaHorizontal/LavaHorizontal";

const RenderLevel = ({ gameLevel, lavaPosition, wallPosition }) => {
  const [position, setPosition] = useState({
    coin: 5,
    lavaDripping: 0,
    lavaVertical: 0,
    lavaHorizontal: 0,
  })
  const [arithmetic, setArithmetic] = useState(1);
  console.log()
  const ref = useRef();

  let angle = 0;
  let lastTime = null;
   
  useAnimationFrame(
    useCallback((deltaTime) => {
      if (lastTime != null) angle += deltaTime * 0.009;
      lastTime = deltaTime;
      
  
      setPosition((prevState => ({
        ...prevState,
        coin: (Math.sin(angle) * 5),
        lavaDripping: ((prevState.lavaDripping + deltaTime * 0.01) % 100),
        lavaVertical: (Math.sin(angle) * 5),
        lavaHorizontal: ( arithmetic ?  prevState.lavaHorizontal + deltaTime * 0.01 : prevState.lavaHorizontal - deltaTime * 0.01)
        })
      ))  
    },[arithmetic])
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
                return <UserBlock key={index} />;
              } else if (item === "o") {
                return <CoinBlock key={index} position={position.coin} />;
              } else if (item === "=") {
                return <LavaHorizontal 
                key={index} 
                position={position.lavaHorizontal}
                lavaPosition={lavaPosition}
                wallPosition={wallPosition}
                setArithmetic={setArithmetic}/>;
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
