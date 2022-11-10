import React, { useEffect } from "react";

import { usePressKey } from '../hooks/useKeyPress'

import { Wrapper, PlayerBlock } from './PlayerStyle'

const Player = ({ position, setArithmetic, wallPosition }) => {
    const handleButtonPress = usePressKey();

    const currPosition = {
        x: position.x + position.posX, //может нужен +
        y: position.y + position.posY,
        curr: true
    }
    const stonesOnTheCurrWay = { x: [currPosition], y: [currPosition] };
    wallPosition.forEach(item => {
        if (
            ((item.x <= currPosition.x + 15)
                && (item.x >= currPosition.x - 15))
            && (item.y >= currPosition.y)
        ) {
            stonesOnTheCurrWay.x.push(item);
            stonesOnTheCurrWay.x.sort((a, b) => a.y > b.y ? 1 : -1)
        }
        if (
            ((item.x <= currPosition.x + 15)
                && item.x >= currPosition.x - 15)
            && item.y <= currPosition.y
        ) {
            stonesOnTheCurrWay.x.push(item);
            stonesOnTheCurrWay.x.sort((a, b) => a.y > b.y ? 1 : -1)
        }
        if (
            (item.y <= currPosition.y + 15)
            && (item.y >= currPosition.y - 15)
            && (item.x >= currPosition.x)
        ) {
            stonesOnTheCurrWay.y.push(item);
            stonesOnTheCurrWay.y.sort((a, b) => a.x > b.x ? 1 : -1)
        }
        if (
            (item.y <= currPosition.y + 15)
            && (item.y >= currPosition.y - 15)
            && (item.x <= currPosition.x)
        ) {
            stonesOnTheCurrWay.y.push(item);
            stonesOnTheCurrWay.y.sort((a, b) => a.x > b.x ? 1 : -1)
        }
    });

    useEffect(() => {
        const indexPlayer = {
            x: stonesOnTheCurrWay.x.findIndex(el => el.y === currPosition.y),
            y: stonesOnTheCurrWay.y.findIndex(el => el.x === currPosition.x)
        };
        const roundingPositionY = Math.ceil(currPosition.y);
        const roundingPositionX = Math.ceil(currPosition.x);
        if (handleButtonPress.left) {
            if (
                (roundingPositionX < stonesOnTheCurrWay.y[indexPlayer?.y + 1]?.x - 23 ?? 1)
            ) {
                if (roundingPositionY - 20 >= stonesOnTheCurrWay.x[indexPlayer.x - 1]?.y ?? 0) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 1, y: 0 },
                            action: handleButtonPress.left
                        }
                    }))
                } else {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: null, y: null },
                            action: handleButtonPress.left
                        }
                    }))
                }
            }
            else if (roundingPositionY - 20 > stonesOnTheCurrWay.x[indexPlayer.x - 1]?.y ?? 20) {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: null, y: 0 },
                        action: handleButtonPress.left
                    }
                }))
            } else {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: 1, y: 0 },
                        action: false
                    }
                }))
            }
        }

        if (handleButtonPress.right) {
            if (
                (roundingPositionX < stonesOnTheCurrWay.y[indexPlayer?.y + 1]?.x - 23 ?? 1)
            ) {
                if (roundingPositionY < stonesOnTheCurrWay.x[indexPlayer.x + 1].y - 22) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 1, y: 1 },
                            action: handleButtonPress.right
                        }
                    }))
                } else {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 1, y: null },
                            action: handleButtonPress.right
                        }
                    }))
                }
            }
            else if (roundingPositionY < stonesOnTheCurrWay.x[indexPlayer.x + 1].y - 22) {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: null, y: 1 },
                        action: handleButtonPress.right
                    }
                }))
            } else {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: 1, y: 1 },
                        action: false
                    }
                }))
            }
        }
        if (handleButtonPress.up) {
            const borderJumping = stonesOnTheCurrWay.y[indexPlayer?.y - 1]?.x ?? 0;
            console.log(borderJumping, roundingPositionX)
            if (roundingPositionX <= borderJumping + 20) {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: 0, y: null },
                        action: false,
                    }
                }))
            }
            else if (
                (roundingPositionX >= stonesOnTheCurrWay.y[indexPlayer?.y + 1]?.x - 25 ?? 1)
                &&
                (roundingPositionX <= stonesOnTheCurrWay.y[indexPlayer?.y + 1]?.x + 25 ?? 1)) {
                if (handleButtonPress.up && handleButtonPress.left) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 0, y: 0 },
                            action: true
                        }
                    }))
                }
                else if (handleButtonPress.up && handleButtonPress.right) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 0, y: 1 },
                            action: true
                        }
                    }))
                }
                else if (roundingPositionX > borderJumping + 30) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 0, y: null },
                            action: handleButtonPress.up
                        }
                    }))
                }
            }
            else {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: 0, y: 0 },
                        action: false
                    }
                }))
            }

        }
        if ((handleButtonPress.up || handleButtonPress.right || handleButtonPress.left) === false) {
            if (roundingPositionX >= stonesOnTheCurrWay.y[indexPlayer.y + 1].x - 24) {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: 0, y: null },
                        action: false,
                    }
                }));
            }
            else if (roundingPositionX < stonesOnTheCurrWay.y[indexPlayer.y + 1].x - 20) {
                setArithmetic(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        direction: { x: 1, y: null },
                        action: true
                    }
                }))
            }
        }
        
    }, [position])

    return (
        <Wrapper>
            <PlayerBlock position={position} />
        </Wrapper>
    )
}

export default Player;