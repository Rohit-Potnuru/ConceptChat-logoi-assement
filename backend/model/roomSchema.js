const mongoose = require('mongoose')

/*
rooms data schema
-> data schema which stores meta data from each chatrooms
--------------------------------
Id: string (pk)
displayName: string
type: int
createdBy: string
createdAt: timestamp
*/

const roomSchema = mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    type: {
        type: String, // if type == 1 then chatroom is Public else chatroom is private
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
})


module.exports = new mongoose.model("rooms", roomSchema);