const AsyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
var objectId = mongoose.Types.ObjectId

const userSchema = require('../model/userSchema.js')
const roomSchema = require('../model/roomSchema.js')
const membershipSchema = require('../model/membershipSchema.js')
const messageSchema = require('../model/messageSchema.js')

const createTestUsers = AsyncHandler(
    async () => {
await userSchema.create({"_id":objectId(1), "username": "rohit1", "email": "rohitpotnuru1@gmail.com", "password": "ILove" })
await userSchema.create({"_id": objectId(2), "username": "rohit2", "email": "rohitpotnuru2@gmail.com", "password": "ILove" })
await userSchema.create({"_id": objectId(3), "username": "rohit3", "email": "rohitpotnuru3@gmail.com", "password": "ILove" })
await userSchema.create({"_id": objectId(4), "username": "rohit4", "email": "rohitpotnuru4@gmail.com", "password": "ILove" })
await userSchema.create({"_id": objectId(5), "username": "rohit5", "email": "rohitpotnuru5@gmail.com", "password": "ILove" })
await userSchema.create({"_id": objectId(6), "username": "rohit6", "email": "rohitpotnuru6@gmail.com", "password": "ILove" })

return 1;
})

const createTestRooms = AsyncHandler( //if type == 1 then 1 -> "PUBLIC" and 0 -> private
    async () => {
await roomSchema.create({ "_id": objectId(1), "displayName": "room1", "type": "PUBLIC", "createdBy": "Rohit", "createdAt": "10"})
await roomSchema.create({ "_id": objectId(2), "displayName": "room2", "type": "PUBLIC", "createdBy": "Rohit", "createdAt": "10"})
await roomSchema.create({ "_id": objectId(3), "displayName": "room3", "type": "PUBLIC", "createdBy": "Rohit", "createdAt": "10"})

await roomSchema.create({ "_id": objectId(4), "displayName": "room4", "type": "PRIVATE", "createdBy": "Rohit", "createdAt": "10"})
await roomSchema.create({ "_id": objectId(5), "displayName": "room5", "type": "PRIVATE", "createdBy": "Rohit", "createdAt": "10"})
await roomSchema.create({ "_id": objectId(6), "displayName": "room6", "type": "PRIVATE", "createdBy": "Rohit", "createdAt": "10"})
await roomSchema.create({ "_id": objectId(7), "displayName": "room7", "type": "PRIVATE", "createdBy": "Rohit", "createdAt": "10"})
return 1;
})

const createTestMembership = AsyncHandler( //status 1 -> unapproved and 0 -> approved to join the room
    async () => {
await membershipSchema.create({"roomId": "4", userId: "1", type: "UNAPPROVED", displayName:"room4"})
await membershipSchema.create({"roomId": "5", userId: "1", type: "UNAPPROVED", displayName:"room5"})
await membershipSchema.create({"roomId": "6", userId: "1", type: "UNAPPROVED", displayName:"room6"})
await membershipSchema.create({"roomId": "7", userId: "1", type: "PRIVATE", displayName:"room7"})
return 1;
})

const createTestMessage = AsyncHandler( //status 1 -> unapproved and 0 -> approved to join the room
    async () => {
        
        
await messageSchema.create({"roomId": "1", userId: "1", "sentAt": "time", "message": "Hello1"})
await messageSchema.create({"roomId": "1", userId: "2", "sentAt": "time", "message": "Hello2"})
await messageSchema.create({"roomId": "1", userId: "3", "sentAt": "time", "message": "Hello3"})
await messageSchema.create({"roomId": "1", userId: "1", "sentAt": "time", "message": "Hello4"})
return 1;
})


module.exports = {createTestUsers, createTestRooms, createTestMembership, createTestMessage}