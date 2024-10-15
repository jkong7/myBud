//Make custom hook to persist state even after the page is refreshed
//stores and retrives data from the browser's local storage, similar to 
//userState, but persists even after page is refreshed or closed as data
//is stored in localStorage

import { useState, useEffect } from 'react'

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(()=>{
        const jsonValue=localStorage.getItem(key)
        if (jsonValue!=null) return JSON.parse(jsonValue)
        if (typeof defaultValue === "function") {
            return defaultValue()
        } else {
            return defaultValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

//localStorage: built in browser feature that allows for persistant key-value
//storage, independent of react

//useState function is using lazy init, which means its setting up 
//value variable by running the function ONLY ONCE when the component
//is first rendered

//using this custom hook, we have access to value and setValue and when
//we use setValue, not only updates component state but also thanks to 
//useEffect persists the change to localStorage. 