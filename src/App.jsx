import React from "react";
import RenderLevel from './components/RenderLevel/RenderLever'
import { GAME_LEVELS } from "./components/levels/levels";


function App() {

  let gameLevel = GAME_LEVELS[0].trim().split("\n");
  const wallPosition = [];
  const lavaPosition = [];
  gameLevel.forEach((item, index1) => {
    const row = item.split('');
    let y = 0;
    row.forEach(item => {
      y = y+1;
      if(item === '#'){
        let width = (index1+1) * 20;
        let height = y*20;
        wallPosition.push({x:width, y: height})
      }
      if(item === '='){
        let width = (index1+1) * 20;
        let height = y*20;
        lavaPosition.push({x:width, y: height})
      }
    })
  })

  

  return (
    <div className="App">
     <RenderLevel 
      gameLevel={gameLevel} 
      lavaPosition={lavaPosition}
      wallPosition={wallPosition}
      />
    </div>
  );
}

export default App;
