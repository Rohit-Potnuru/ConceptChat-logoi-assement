import {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import { Form, InputGroup, Button } from 'react-bootstrap';

const ENDPOINT = 'http://localhost:3005/'
let socket;
const usernameO = "asd";
const roomIdO = "1";
function Chat({userId, chatRoomMeta}) {
    // const {chatRoomMeta} = props;
    console.log(chatRoomMeta)
    // const userIdO = chatRoomMeta.userId
    
    const roomIdO = chatRoomMeta?._id
    const userIdO = userId
    console.log(chatRoomMeta, "asdknasnnajsnfjajsnfinsadnjk")

    const [Msgs,setMsgs] = useState([])
    
    const [text, setText] = useState();
    useEffect(() => {
        socket = io(ENDPOINT);
        // return () => { 
        //     socket.emit('disconnect');
        //     socket.off();
        // }

    }, [ENDPOINT])
    
    useEffect(()=>{
        socket.emit('join', {username:usernameO,roomId: roomIdO})
        socket.on('recieve-message',(message)=>{
            console.log(message);
        })
        
        socket.on('load-message',(message)=>{
            console.log(message)
            var li = Msgs;
            li.push(message.message)
            console.log(li)
            setMsgs(li)
            let interval = window.setInterval(function(){
                var elem = document.getElementById('chat');
                elem.scrollTop = elem.scrollHeight;
                window.clearInterval(interval);
            },1000);
        })
        socket.on('recieve-join',(message)=>{
            console.log(message);
            setMsgs(prevMsgs => message.message.messages)
            let interval = window.setInterval(function(){
                var elem = document.getElementById('chat');
                elem.scrollTop = elem.scrollHeight;
                window.clearInterval(interval);
            },1000);
        })
    },[socket])

    const displayMessages = (msg) => {
        {
            if(msg.userId == userIdO)
            {
                return <div style={{textAlign:'justify',clear:'both',display:'block',float:'right',padding:'20px',marginBottom:'5px',backgroundColor:'red',flexWrap:'wrap',borderRadius:'12px',marginRight:'10px',marginLeft:'30%'}}>
                            <small style={{color:'black'}}>{msg.userId}</small>
                            <h1>{msg.message}</h1>
                        </div>
            }
            else
            {
                return <div style={{textAlign:'justify',display:'block',clear:'both',float:'left',padding:'20px',marginBottom:'5px',backgroundColor:'black',flexWrap:'wrap',borderRadius:'12px',marginRight:'30%'}}>
                        <small style={{color:'white'}}>{msg.userId}</small>
                        <h1 style={{color:'white'}}>{msg.message}</h1> 
                    </div>
            }
        }
           
    }

    const sendMessage = ()=>{
        const roomId = roomIdO
        const messageData = {userId:userIdO, sentAt:Date().toLocaleString(),message:text}
        socket.emit('send-message', {roomId, messageData}, (error) => {
            alert(error)
        })
        console.log("sendMessgae")
        setText('')
    }
    
    return (
        <div style={{marginTop:'0px'}} className="d-flex flex-column flex-grow-1">
            <div  className="flex-grow-1 overflow-auto">  
            <Form>
                <div id="chat" style={{overflow:'scroll',backgroundColor:'grey',height:'79vh',marginBottom:'10px'}}>
                   
                     {
                        Msgs.map(displayMessages)
                     }
                </div>

                <Form.Group>
                    <InputGroup>
                        <Form.Control
                         as="textarea"
                         required
                         value={text}
                         onChange={e => setText(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button type="submit" onClick={sendMessage}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form> 
            </div>
            
        </div>
    )
}

export default Chat;