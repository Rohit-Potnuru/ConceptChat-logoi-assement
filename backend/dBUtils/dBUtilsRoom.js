const AsyncHandler = require("express-async-handler")

const roomSchema = require('../model/roomSchema.js');
const membershipSchema = require('../model/membershipSchema.js');

const createRoomsdB = AsyncHandler(
    async (roomData) => {
        var resRoom = await roomSchema.create(roomData)

        if(resRoom){
            return {_id: resRoom._id}
        }
        else{
            throw new Error('Failed to create Room data')
        }
    })

const addMemberdB = AsyncHandler(
    async (membershipData) => {
        var resMembership = await membershipSchema.create(membershipData)

        if(resMembership){
            return resMembership;
        }
        else {
            console.log(err);
            throw new Error("ERR: Error Failed to add member in Membership")
        }
    })

const updateMemberdB = AsyncHandler(
    async (membershipCondition, update) => {
        var resMembership = await membershipSchema.findOneAndReplace(membershipCondition, update)

        if(resMembership){
            return resMembership;
        }
        else {
            console.log(err);
            throw new Error("ERR: Error Failed to update member in Membership")
        }
    })

const removeMemberdB = AsyncHandler(
    async (membershipCondition) => {
        var resMembership = await membershipSchema.findOneAndRemove(membershipCondition)

        if(resMembership){
            return resMembership;
        }
        else {
            console.log(err);
            throw new Error("ERR: Error Failed to remove member in Membership")
        }
    })
    

module.exports = {createRoomsdB, addMemberdB, updateMemberdB, removeMemberdB}