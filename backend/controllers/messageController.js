const asyncHandler = require('express-async-handler');
const {getAllMessagesdB, setMessagedB} = require('../dBUtils/dBUtilsMessage.js');
const messageSchema = require('../model/messageSchema.js');

const getAllMessages = asyncHandler(
    async (roomId) => {    

        //const startTime = req.body.startTime
        //const stopTime = req.body.stopTime
        //const timeQuery = {"startTime":, "stopTime":}

        const messageGetData = {"roomId": roomId}
        var resMessage = await messageSchema.find()
        console.log(resMessage)

        var resMessages = await getAllMessagesdB(messageGetData);
        console.log("Get All messages")
        console.log(resMessages)

        if(resMessages){
            return {message: resMessages}
        }
        else{
            return {error:'Failed to Fetch messages Try again'}
        }
    }
);


const postMessage = asyncHandler(
    async (roomId, messageData) => {
        console.log("Post message")

        
        const messageDatadB = { 
                            roomId: roomId,
                            userId: messageData.userId,
                            sentAt: messageData.sentAt,
                            message: messageData.message
                            }
                            console.log(messageDatadB)
        var resMessage = await setMessagedB(messageDatadB)
        if(resMessage){
            return resMessage
        }
        else{
            return ('Failed to send message Try again')
        }
    }
);


module.exports = {getAllMessages, postMessage}