import React from "react";
import RenderLevel from './components/RenderLevel/RenderLever'
import { GAME_LEVELS } from "./components/levels/levels";
import './style.css'

function App() {
  let   gameLevel    = GAME_LEVELS[0].trim().split("\n");
  const wallPosition = [];
  const lavaPosition = [];
  let playerStartPosition;

  gameLevel.forEach((item, index) => {
    const row = item.split('');
    let   y   = 0;
    row.forEach(item => {
      y = y + 1;
      const width  = (index+1) * 20;
        const height = y*20;
      if(item === '#'){
        
        wallPosition.push({x:width, y: height})
      }
      if(item === '='){
        // const width  = (index+1) * 20;
        // const height = y*20;
        lavaPosition.push({x:width, y: height, id: index, type: 'horizontal', 'pos': 0,
        'direction': 1,})
      }
      if(item === '+'){
        // const width  = (index+1) * 20;
        // const height = y*20;
        lavaPosition.push({x:width, y: height, id: index, type: 'static'})
      }
      if(item === 'v'){
        // const width  = (index+1) * 20;
        // const height = y*20;
        lavaPosition.push({x:width, y: height, id: index, type: 'dripping', 'pos': 0,})
      }
      if(item === '@'){
        // const width               = (index+1) * 20;
        // const height              = y*20;
        playerStartPosition       = {x:width, y: height, id: index}
      }
    })
  })
 
  return (
    <div className="App">
     <RenderLevel 
      gameLevel           = {gameLevel}
      lavaPosition        = {lavaPosition}
      wallPosition        = {wallPosition}
      playerStartPosition = {playerStartPosition}
      />
    </div>
  );
}

export default App;
