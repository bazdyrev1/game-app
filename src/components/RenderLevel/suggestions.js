export const motionControllerHorizontal = (player, prevSatePlayer, deltaTime ) => {
    if((player.direction.y === 0) && player.action){
     return  prevSatePlayer.posY - deltaTime * 0.04 
    }
    
    if((player.direction.y === 1) && player.action){
      return  prevSatePlayer.posY + deltaTime * 0.04 
     }
     return prevSatePlayer.posY
  };
  
export const motionControllerVertical = (player, prevSatePlayer, deltaTime ) => {
    console.log('work')
    if((player.direction.x === 1) && player.action){
     return  prevSatePlayer.posX + deltaTime * 0.06 
    }
    
    if((player.direction.x === 0) && player.action){
      return prevSatePlayer.posX - deltaTime * 0.4
     }
     return prevSatePlayer.posX
  }