import {useEffect, useState} from 'react'

const PREFIX = 'logoi-assesment-Rohit'
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {  // for getting the value from local storage
        const jsonValue = localStorage.getItem(prefixedKey)

        if (jsonValue != null) return JSON.parse(jsonValue)

        if(typeof initialValue === 'function') return initialValue()
        else return initialValue
    })

    //storing the value
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]

}
