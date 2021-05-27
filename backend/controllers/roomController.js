const asyncHandler = require('express-async-handler');

const {createRoomsdB, addMemberdB, updateMemberdB, removeMemberdB} = require('../dBUtils/dBUtilsRoom.js')
const {existUserNamedB} = require('../dBUtils/dBUtilsUser.js')

const createRoom = asyncHandler(
    async (req, res) => {
        
        const roomData = req.body.room;
        
        var resRoom = await createRoomsdB(roomData);
        //console.log(roomres);
        if(resRoom){
            console.log(`room created ${resRoom._id}`)
            res.status(201).json({
                _id: resRoom._id})
        }
        else{
            res.status(400).json('Invalid room data')
        }
    }
);

const addMember = asyncHandler(
    async (req, res) => {
        const roomId = req.params.roomId
        const userId = req.body.userId
        const displayName = req.body.displayName
        const state = req.body.state == 0 ? "UNAPPROVED": "PRIVATE"
        console.log(`Add member ${req.body.state} is ${userId}`)
        if(!existUserNamedB(userId)){
            res.status(400).json({err: "ERR: User doesnot exists"})
        } 

        const membershipData = {
                                "roomId": roomId,
                                "userId": userId, 
                                "displayName": displayName,
                                "type": state            // 1 means user has unapproved and 0 means approved to join the room
                               }

        
        var resMembership = await addMemberdB(membershipData);
        console.log(`membership created `)
        if(resMembership){
            res.status(201).json({"roomId": resMembership.roomId, "_id": resMembership._id, "userId":resMembership.userId})
        }else{
            res.status(400)
            throw new Error('Invalid add user member for room')
        }
    }
);

const confirmMember = asyncHandler(
    async (req, res) => {
        const roomId = req.params.roomId
        const userId = req.params.userId
        const joinStatus = req.body.joinStatus
        
        console.log(req.body)
        const membershipCondition = {
            "roomId": roomId,
            "userId": userId
        }
        const update = {
            "displayName": req.body.displayName,
            "roomId": roomId,
            "userId": userId,
            "type": "PRIVATE"
        }

        if(joinStatus == 1) {
                var resMembership = await updateMemberdB(membershipCondition, update)

                if(resMembership){
                    res.status(201).json({"roomId": resMembership.roomId})
                }else{
                    res.status(400)
                    throw new Error('Failed to join the room')
                }
            }
        
        else {
                var resMembership = await removeMemberdB(membershipCondition)
                if(resMembership){
                    res.status(201).json({"roomId": resMembership.roomId})
                }else{
                    res.status(400)
                    throw new Error('ERR: Failed to cancel the invite request to the room')
                }
            }
    }
);


module.exports = {createRoom, addMember, confirmMember};
