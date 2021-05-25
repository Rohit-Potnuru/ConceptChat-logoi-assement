const mongoose = require('mongoose')

/*
membership data schema
-> data schema which stores private or unapproved
--------------------------------
userId: string (pk)
Chatroom: string
UserId: string
Status: int
*/

const membershipSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    displayName: {
        type:String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String, // 1 means user has unapproved and 0 means approved to join the room
        required: true
    }
})

module.exports = new mongoose.model("membership", membershipSchema);