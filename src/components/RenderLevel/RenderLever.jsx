import React, { useState, useRef, useCallback } from "react";
import useAnimationFrame from '../animation/Animation'
import { CoinBlock,
 EmptyBlock, 
 LavaDrippingBlock, 
 LavaStaticBlock, 
 LavaVerticalBlock, 
 Row,
 WallBlock, 
 Wrapper 
} from "./style";
import UserBlock from '../Player/Player'
import LavaHorizontal from "../LavaHorizontal/LavaHorizontal";

const RenderLevel = ({ gameLevel, lavaPosition, wallPosition }) => {
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
    player: 0,
  })

  const initialValues = position.lavaHorizontal.map(item => {
    return {
      ...item,
      direction: 1,
    }
  })

  const [arithmetic, setArithmetic] = useState(initialValues);
  const ref                         = useRef();

  let angle    = 0;
  let lastTime = null;

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
          arithmetic.forEach(item1 => {
            if (item1.id === item.id) {
              item1.direction ? permission = true : permission = false;
            }
          })

          return {
            ...item,
            'pos': permission ? item.pos + deltaTime * 0.04: item.pos - deltaTime * 0.04
          }
        }),
        player: ((prevState.player + deltaTime * 0.01) % 100)
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
                    position      = {position.player}
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
