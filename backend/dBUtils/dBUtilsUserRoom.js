const AsyncHandler = require("express-async-handler")

const roomSchema = require('../model/roomSchema.js');
const membershipSchema = require('../model/membershipSchema.js');

const getPublicRoomsdB = AsyncHandler(
    async () => {
        var publicRooms = await roomSchema.find({ type: "PUBLIC" })
        // publicRooms = publicRooms.select('roomId displayName userId')

        if(publicRooms){
            console.log(publicRooms)
            return publicRooms;
        }
        else {
            console.log(err);
            throw new Error("ERR: Error Failed to get PublicRooms")
        }
    })

const getPrivateRoomsdB = AsyncHandler(
    async (userId) => {
        
        var privateRooms = await membershipSchema.find({ userId: userId, type: "PRIVATE" })
        // privateRooms = privateRooms.select('roomId displayName userId')

        if(privateRooms){
            return privateRooms;
        }
        else {
            console.log(err);
            throw new Error("ERR: Error Failed to get PrivateRooms")
        }
    })


const getUnApprovedRoomsdB = AsyncHandler(
    async (userId) => {
        var unApprovedRooms = await membershipSchema.find({ userId: userId, type: "UNAPPROVED" })
        var h = await membershipSchema.find()
        console.log(h);
        // unApprovedRooms = unApprovedRooms.select('roomId displayName userId')

        if(unApprovedRooms){
            return unApprovedRooms;
        }
        else {
            console.log(err);
            throw new Error("ERR: Error Failed to get unApprovedRooms")
        }
    })


module.exports = {getPublicRoomsdB, getPrivateRoomsdB, getUnApprovedRoomsdB}