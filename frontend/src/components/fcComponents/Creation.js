import {useState,useRef} from 'react';
import axios from 'axios'
const IP = "localhost"
const URL = `http://${IP}:8085`
function CreateRoom(props) {
    const {userId, username} = props

    const chatId = useRef()
    const [ref,setRef] = useState('')
    const [dis,setDis] = useState('none')
    const [mem_name,setMemName] = useState('')
    const [members,setMembers] = useState([])
    const [formState, setFormState] = useState({
        roomName: '',
        roomType: 'PUBLIC',
        roomMembers: []
    });
    
    const sendRoomData = ()=>{
        setDis('')
        const roomObject = {
            room:
                {
                    displayName: formState.roomName,
                    type: formState.roomType,
                    createdBy: username,
                    createdAt: Date().toLocaleString()
                }
        }
    
        axios.post(`${ URL }/api/rooms/Rooms`,roomObject).then(res=>{
            if(formState.roomType !== 'PUBLIC')
            {
            chatId.current = res.data._id
            console.log(chatId.current);
            console.log(userId)
            const JSONobj = {
                "userId":userId,
                "displayName": formState.roomName,
                "state": 1
            }
            axios.post(`${ URL }/api/rooms/Rooms/${chatId.current}/Users/`,JSONobj).then(res => {console.log(res.data);})

            if(formState.roomType === 'PRIVATE')
            {
                members.map((obj) => {
                    const JSONobj = {
                        "userId":obj,
                        "displayName":formState.roomName,
                        "state": 0
                    }
                    axios.post(`${ URL }/api/rooms/Rooms/${chatId.current}/Users`,JSONobj).then(res => {
                        console.log(res.data);
                    })
                })
                setDis('')
                setRef('none')
            }
        }})
    }
    const addMember = ()=>{
        if(mem_name !== '')
        {
            var li = members
            li.push(mem_name)
            setMembers(li)
            console.log(members)
            setMemName('')
        }
    }

    return (
        <div>
        <div style={{marginLeft:'40%'}}>
            <label class="text" for="rname">Room Name:</label><br/>
            <input style={{width:'40%'}} class="form-control" type="text" id="rname" name="rname" placeholder="Room Name"
                value={formState.roomName} onChange={(e) => {
                    setFormState((oldState) => {
                        return {
                            ...oldState, roomName: e.target.value
                        }
                    })
                }}/>

            <div>
                <input type="radio" id="public" name="room-type" value="PUBLIC"
                    checked={formState.roomType === 'PUBLIC'} onClick={
                        () => setFormState((oldState) => {
                            return {
                                ...oldState, 
                                roomType: 'PUBLIC',
                                roomMembers: []
                            }
                        })
                    }/>
                <label style={{marginLeft:'5px'}} for="huey">Public</label><br/>
                <input type="radio" id="private" name="room-type" 
                    value="PRIVATE" 
                    checked={formState.roomType === 'PRIVATE'} onClick={
                    () => setFormState((oldState) => {
                        return {
                            ...oldState, roomType: 'PRIVATE'
                        }
                    })
                }/>
                <label style={{marginLeft:'5px'}} for="private">Private</label>
            </div>
            <div style={{display: formState.roomType === 'PRIVATE' ? ref :'none', marginLeft:'10%'}}>
                    {members.map(obj => {
                        return <h6 style={{marginTop:'10px'}}>{obj}</h6>
                    })}
                    <input style={{width:'400px'}} name="mem_name" class="form-control" type="text" value={mem_name}  
                                                onChange={(e)=>{setMemName(e.target.value); console.log(mem_name)}}/>

                    <button style={{marginTop:'3px'}} class="btn btn-primary" onClick={addMember}>Add Member</button>
            </div>
            <div>
                {/* <label>Room Members (if private):</label><br/>
                {
                    formState.roomMembers.map((val, index) => {
                        return (
                            <div>
                            <input type="text" id={`mname-${index}`} 
                                name={`mname-${index}`} 
                                value={val} onChange={(e) => {
                                setFormState((oldState) => {
                                    oldState.roomMembers[index] = e.target.value;
                                    return {
                                        ...oldState, 
                                        roomMembers: [...oldState.roomMembers]
                                    }
                                })
                                }}/><br/>
                                </div>
                        )
                    })
                } */}
                
                {/* <button onClick={(e) => {
                    if (formState.roomType === 'public') {
                        return console.log("Can't add members...");
                    }

                    setFormState((oldState) => {
                        return {
                            ...oldState, 
                            roomMembers: [...oldState.roomMembers, '']
                        }
                    })
                    e.preventDefault();
                }}>Add Members</button> */}
            </div>

            <button class="btn btn-primary" style={{marginTop:'10px'}} onClick={sendRoomData}>Submit</button>
            <h5 style={{display:dis}}>Successfully created room</h5>
        </div>
        <div>
            
        </div>
        </div>
    );
}

export default CreateRoom;