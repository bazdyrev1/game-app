import React from "react";
import { useEffect } from "react";
import { Wrapper } from './style'

const LavaHorizontal = ({ position, lavaPosition, wallPosition, setArithmetic }) => {
  let currPos = lavaPosition[0].y - position;
  const stonesOnTheCurrRow = [lavaPosition[0]];
  wallPosition.forEach(item => {
    if ((item.x === lavaPosition[0].x) && item.y > lavaPosition[0].y) {
      stonesOnTheCurrRow.push(item);
      stonesOnTheCurrRow.sort((a, b) => a.y > b.y ? 1 : -1)
    } else if ((item.x === lavaPosition[0].x) && item.y < lavaPosition[0].y) {
      stonesOnTheCurrRow.push(item);
      stonesOnTheCurrRow.sort((a, b) => a.y > b.y ? 1 : -1)
    }
  })

  useEffect(() => {
    const indexLava = stonesOnTheCurrRow.findIndex(el => el.y === lavaPosition[0].y);
      if (currPos <= stonesOnTheCurrRow[indexLava -1].y + 20) {
        setArithmetic(0)
      };
      if (currPos >= stonesOnTheCurrRow[indexLava + 1].y - 20) {
        setArithmetic(1)
      };
    }, [currPos])

  return (
    <Wrapper position={position} />
  )
}
export default LavaHorizontal;