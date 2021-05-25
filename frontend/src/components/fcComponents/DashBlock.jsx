import {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

const IP = "localhost"
const URL = `http://${IP}:8085`

const DashBlock = ({setChat, chatRoomData}) => {
   const [chatRoomD,setChatRoomD] = useState(chatRoomData)
   console.log("Donseenu")
    useEffect(()=>{
        console.log("whereIn",chatRoomData)
        setChatRoomD(chatRoomData)},[chatRoomData])
    console.log(chatRoomD)
    const nithin = (chatRoomD)=>{
        if(chatRoomD.type == "UNAPPROVED")
        {
            
        }
        else
        {
            setChat(chatRoomD);
        }
    }
    const funct = (chatRoom)=>{
      axios.post(`http://${URL}/api/rooms/Rooms/${chatRoom.roomId}/Users/${chatRoom._id}`).tthen(res=>{
        setChat(chatRoom)
      })
      
    }
    return (
        <div>
        <div onClick={() => nithin(chatRoomD) }
        style={{
            padding: 32,
            border: "solid black 8px"
        }} data-toggle="modal" data-target="#exampleModal">
            {console.log(chatRoomD?.displayName,"fefffeafae453")}
            {chatRoomD?.displayName}
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Approval</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <h4>Click approve to enter the chat ?</h4>
            </div>
            <div class="modal-footer">
              
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>funct(chatRoomD)}>Approve</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}
export default DashBlock