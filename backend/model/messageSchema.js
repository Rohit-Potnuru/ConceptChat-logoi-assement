const mongoose = require('mongoose');

/*
messages data schema
-> data schema which stores messsages
--------------------------------
Id: string (pk)
Chatroom: string
UserName: string
SentAt: timestamp
Message: string

*/

const messageSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    sentAt: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
})

module.exports = new mongoose.model("messages", messageSchema)