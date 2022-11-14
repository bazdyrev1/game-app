export const motionControllerHorizontal = (player, prevSatePlayer, deltaTime) => {
  if ((player.direction.y === 0) && player.action) {
    return prevSatePlayer.posY - deltaTime * 0.04
  }

  if ((player.direction.y === 1) && player.action) {
    return prevSatePlayer.posY + deltaTime * 0.04
  }
  return prevSatePlayer.posY
};

export const motionControllerVertical = (player, prevSatePlayer, deltaTime) => {
  if ((player.direction.x === 1) && player.action) {
    return prevSatePlayer.posX + deltaTime * 0.06
  }

  if ((player.direction.x === 0) && player.action) {
    return prevSatePlayer.posX - deltaTime
  }
  return prevSatePlayer.posX
}
export const contactWithLava = (position) => {
  const touchedHorizontal = position.lavaHorizontal.map((item) => {
    const contactX = (((position.player.x + position.player.posX) <= item.x + 10)
      &&
      ((position.player.x + position.player.posX) >= item.x - 10)
    )
    const contactY = (((position.player.y + position.player.posY) >= item.y - item.pos - 10)
      &&
      ((position.player.y + position.player.posY) <= item.y - item.pos + 10))

    return (contactX && contactY)
  })

  const touchedDripping = position.lavaDripping.map(item => {
    const contactX = (((position.player.x + position.player.posX) <= item.x + item.pos + 5)
      &&
      ((position.player.x + position.player.posX) >= item.x + item.pos - 10)
    )
    const contactY = (((position.player.y + position.player.posY) >= item.y - 3)
      &&
      ((position.player.y + position.player.posY) <= item.y + 3))

    return (contactX && contactY)
  })

  const touchedStatic = position.lavaStatic.map(item => {
    const contactX = (((position.player.x + position.player.posX) <= item.x + 5)
      &&
      ((position.player.x + position.player.posX) >= item.x - 10)
    )
    const contactY = (((position.player.y + position.player.posY) >= item.y - 10)
      &&
      ((position.player.y + position.player.posY) <= item.y + 10))

    return (contactX && contactY)
  })

  return touchedStatic.includes(true) || touchedDripping.includes(true) || touchedHorizontal.includes(true)
}