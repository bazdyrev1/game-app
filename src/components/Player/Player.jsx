import React, { useEffect } from "react";

import { usePressKey } from '../hooks/useKeyPress'

import { Wrapper, PlayerBlock } from './PlayerStyle'

const Player = ({ position, setArithmetic, wallPosition }) => {
    const up = usePressKey('ArrowUp');
    const right = usePressKey('ArrowRight');
    const left = usePressKey('ArrowLeft');
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
        if (left) {
            if (
                (roundingPositionX < stonesOnTheCurrWay.y[indexPlayer?.y + 1]?.x - 23 ?? 1)
            ) {
                if (roundingPositionY - 20 >= stonesOnTheCurrWay.x[indexPlayer.x - 1]?.y ?? 0) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 1, y: 0 },
                            action: left
                        }
                    }))
                } else {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: null, y: null },
                            action: left
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
                        action: left
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

        if (right) {
            if (
                (roundingPositionX < stonesOnTheCurrWay.y[indexPlayer?.y + 1]?.x - 23 ?? 1)
            ) {
                if (roundingPositionY < stonesOnTheCurrWay.x[indexPlayer.x + 1].y - 22) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 1, y: 1 },
                            action: right
                        }
                    }))
                } else {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 1, y: null },
                            action: right
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
                        action: right
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
        if (up) {
            console.log(roundingPositionX)
            const borderJumping = stonesOnTheCurrWay.y[indexPlayer?.y - 1]?.x ?? 0;
            if (roundingPositionX < borderJumping + 20) {
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
                if (up && left) {
                    setArithmetic(prevState => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            direction: { x: 0, y: 0 },
                            action: true
                        }
                    }))
                }
                else if (up && right) {
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
                            action: up
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
        if ((up || right || left) === false) {
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