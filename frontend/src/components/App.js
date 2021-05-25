import React, { useState, useEffect } from 'react'
import Login from './login';
import useLocalStorage from '../hooks/useLocalStorage'
import FancyChat from './fancyChat'
function App() {
    const [userId, setUserId] = useState()//useLocalStorage()
    const [newid, setNewId] = useState(1)
    const [userMeta, setUserMeta] = useState()
    const [username,setUsername] = useState()
    

    useEffect(() => {
        if(userMeta){
        sendToBackEnd()
        setUserId(prev => userMeta.userId)
        setUsername(prev => userMeta.username)
        }
    }, [userMeta])

    const sendToBackEnd = ()=>{
        console.log(userMeta)
    }

    return (
            userId ? <FancyChat userId={userId} username={username} /> : <Login onIdSubmit={setUserMeta} />
    )
}


export default App;