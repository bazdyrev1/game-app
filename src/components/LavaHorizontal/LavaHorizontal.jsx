import React from "react";
import { useEffect } from "react";
import { Wrapper } from './style'

const LavaHorizontal = ({
  position,
  lavaPosition,
  wallPosition,
  setPosition
}) => {
  // console.log(position)
  let currPos = lavaPosition.y - position.pos;
  const stonesOnTheCurrRow = [lavaPosition];

  wallPosition.forEach(item => {
    if ((item.x === lavaPosition.x) && (item.y >= lavaPosition.y)) {
      stonesOnTheCurrRow.push(item);
      stonesOnTheCurrRow.sort((a, b) => a.y > b.y ? 1 : -1)
    } else if ((item.x === lavaPosition.x) && item.y < lavaPosition.y) {
      stonesOnTheCurrRow.push(item);
      stonesOnTheCurrRow.sort((a, b) => a.y > b.y ? 1 : -1)
    };
  });

  useEffect(() => {
    const indexLava = stonesOnTheCurrRow.findIndex(el => el.y === lavaPosition.y);

    if (currPos <= stonesOnTheCurrRow[indexLava - 1].y + 21) {
      setPosition(prevState => ({
        ...prevState,
        lavaHorizontal: prevState.lavaHorizontal.map(item => {
          if (item.id === position.id) {
            return {
              ...position,
              direction: 0
            }
          };
          return item;
        }),
      }))
    };
    if (currPos >= stonesOnTheCurrRow[indexLava + 1].y - 21) {
      setPosition(prevState => ({
        ...prevState,
        lavaHorizontal: prevState.lavaHorizontal.map(item => {
          if (item.id === position.id) {
            return {
              ...position,
              direction: 1
            }
          };
          return item;
        }),
      }))
    };
  }, [currPos]);

  return (
    <Wrapper position={position.pos} />
  );
};

export default LavaHorizontal;