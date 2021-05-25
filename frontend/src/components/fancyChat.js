import {useState,useEffect, useRef} from 'react';

import './fancyChat.css';
import Dashboard from './fcComponents/Dashboard';
import CreateRoom from './fcComponents/Creation';
import ChatRoom from './fcComponents/Chat';

const FancyChat = (props) => {
  const {userId, username} = props;
  const [view, setView] = useState('home');
  const [chatRoomMeta, setChatRoomMeta] = useState();
  console.log(`${userId} and ${username}`)

  useEffect(()=>{},[userId, username])

  // useEffect(()=>{
  //   console.log(chatRoomMeta)
  //   if(chatRoomMeta.type=="UNAPPROVED")
  //   {
  //     window.alert('Do you want to continue?');
  //   }
  // },[chatRoomMeta])

  return (
    <div className="App">
      <div className="navbar">
        <a href="#home" onClick={() => setView('home')} style={{ marginRight: 48 }}>
          Chat App</a>
        
        <a href="#home" onClick={() => setView('home')}>
          Dashboard
        </a>
        
        <a href="#create" onClick={() => setView('create')}>
          Create Room
        </a>
        
      </div>

      <div style={{margin:'0'}} className="fancyChat-Body">
        {
          view === 'home' ? (<Dashboard userId={userId} username={username} setChat={
                  (chatRoomMetaData) => { 
                                          console.log(chatRoomMetaData) 
                                          setChatRoomMeta(chatRoomMetaData)
                                          setView('chat')}
                  }/>) : null
        }
        {
          view === 'create' ? (<CreateRoom userId={userId} username={username}/>) : null
        }
        {
          view === 'chat' ? (<ChatRoom userId={userId} chatRoomMeta = {chatRoomMeta}/>) : null
        }
      </div>
    </div>
  );
}

export default FancyChat;
