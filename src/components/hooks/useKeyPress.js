import { useEffect, useState } from "react"

export const usePressKey = () => {
    const [isKeyPressed, setIsKeyPressed] = useState({up: false, right: false, left: false});

    const downHandler = ({key}) => {
        if(key === 'ArrowUp'){
            setIsKeyPressed(prevState => ({
                ...prevState,
                up: true
            }))
        } else if (key === 'ArrowRight') {
            setIsKeyPressed(prevState => ({
                ...prevState,
                right: true
            }))
        } else if (key === 'ArrowLeft'){
            setIsKeyPressed(prevState => ({
                ...prevState,
                left: true
            }))
        }
    }
    const upHandler = ({key}) => {
        if(key === 'ArrowUp'){
            setIsKeyPressed(prevState => ({
                ...prevState,
                up: false
            }))
        } else if (key === 'ArrowRight') {
            setIsKeyPressed(prevState => ({
                ...prevState,
                right: false
            }))
        } else if (key === 'ArrowLeft'){
            setIsKeyPressed(prevState => ({
                ...prevState,
                left: false
            }))
        }
    }
    
    useEffect(() => {
        window.addEventListener('keydown',
        downHandler);
        window.addEventListener('keyup',
        upHandler);
        return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
        }        
    },[])
    return isKeyPressed;
}