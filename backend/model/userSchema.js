const mongoose = require('mongoose');

/*
users data schema
-> data schema which stores meta data of each chatrooms
--------------------------------
_Id: string (pk)
Name: string
Password: string
*/

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('users', userSchema);