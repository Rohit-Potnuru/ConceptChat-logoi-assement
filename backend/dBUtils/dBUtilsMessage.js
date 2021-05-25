const AsyncHandler = require("express-async-handler")

const messageSchema = require('../model/messageSchema.js');

const getAllMessagesdB = AsyncHandler(
    async (messageData) => {

        var resMessage = await messageSchema.find(messageData)

        if(resMessage){
            return {messages: resMessage}
        }
        else{
            throw new Error('Failed to Fetch messages')
        }
    })

const setMessagedB = AsyncHandler(
    async (messageData) => {
        var resMessage = await messageSchema.create(messageData)

        if(resMessage){
            return {status: 200}
        }
        else{
            throw new Error('Failed to load message')
        }
    }
)

    

module.exports = {getAllMessagesdB, setMessagedB}