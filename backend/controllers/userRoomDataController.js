const AsyncHandler = require("express-async-handler")

// const roomSchema = require('../model/roomSchema.js');
// const membershipSchema = require('../model/membershipSchema.js');
const {getPublicRoomsdB, getPrivateRoomsdB, getUnApprovedRoomsdB} = require('../dBUtils/dBUtilsUserRoom.js');

const getUserRooms = AsyncHandler(
    async (req, res) => {
        const userId = req.params.userId
        const type = req.params.type

        console.log(`userRoomdata is ${userId} and ${type}`)
        var userRoomData;
        if(type == "PUBLIC") {
            await getPublicRoomsdB().then((res) => {userRoomData = res });
        }
        else if(type == "PRIVATE") {
            await getPrivateRoomsdB(userId).then((res) => {userRoomData = res });
        }
        else if(type == "UNAPPROVED") {
            await getUnApprovedRoomsdB(userId).then((res) => {userRoomData = res });
        }
        else{
            res.status(400)
            throw new Error('Invalid userroom get call')
        }

        console.log(userRoomData)
        res.status(201).json(userRoomData)
})

module.exports = {getUserRooms}