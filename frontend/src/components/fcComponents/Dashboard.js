import {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import DashBlock from './DashBlock';

const IP = "localhost"
const URL = `http://${IP}:8085`


function Dashboard({setChat, userId, username}) {
    // const {setChat, userId, username} = props;

    
    const [publicRooms, setPublicRooms] = useState([]);
    
    const [privateRooms, setPrivateRooms] = useState([]);
    const [unApprovedRooms, setUnApprovedRooms] = useState([]);

    const [reRender, setReRender] = useState();

    useEffect(() => {
        console.log("render")
        
        axios.get(`${ URL }/api/userrooms/Users/${userId}/Rooms/PUBLIC`).then(res => {
                        console.log("Public");
                        console.log(res.data);
                        
                        setPublicRooms(prevPublicRooms => res.data)
                    })
        axios.get(`${ URL }/api/userrooms/Users/${userId}/Rooms/PRIVATE`).then(res => {
                        console.log("Private");
                        console.log(res.data);
                        setPrivateRooms(prevPrivateRooms => res.data)
                    })
        axios.get(`${ URL }/api/userrooms/Users/${userId}/Rooms/UNAPPROVED`).then(res => {
                        console.log("UnApproved");
                        console.log(res.data);
                        setUnApprovedRooms(prevUnApprovedRooms => res.data)
                    })
    },[])

    useEffect(() => {}, [reRender])
    const refreshPage = ()=>{
        console.log(reRender)
        setReRender(prev => prev + 1)
    }

    const displayChatRooms = (currentChatRoom) => {
        return <DashBlock setChat={setChat} chatRoomData={currentChatRoom}/>
    }
    
    
    return (
        <div>
            <Button type = "submit" onClick={refreshPage}>Refresh</Button>
            
            <h1>
                Dashboard
            </h1>
            <h2>Public Rooms</h2>
            {publicRooms.map((currentChatRoom)=>{
                 return <DashBlock setChat={setChat} chatRoomData={currentChatRoom}/>
            })}
            <h2>Private Rooms</h2>
            {privateRooms.map((currentChatRoom)=>{
                 return <DashBlock setChat={setChat} chatRoomData={currentChatRoom}/>
            })}
            <h2>Pending Approval Rooms</h2>
            {unApprovedRooms.map((currentChatRoom)=>{
                 return <DashBlock setChat={setChat} chatRoomData={currentChatRoom}/>
            })}
        </div>
    )
}

export default Dashboard;