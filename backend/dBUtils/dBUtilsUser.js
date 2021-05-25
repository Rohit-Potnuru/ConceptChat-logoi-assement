const AsyncHandler = require('express-async-handler');
const { setFlagsFromString } = require('v8');
const userSchema = require('../model/userSchema.js');

const setUserdB = AsyncHandler(
    async (userId) => {
        var resState = await userSchema.exists({"userId": userId});
        return resState;
    } 
)

const existUserByIddB = AsyncHandler(
    async (userId) => {
        var resState = await userSchema.exists({"userId": userId});
        return resState;
    } 
)

const existUserNamedB = AsyncHandler(
    async (username) => {
        var resState = await userSchema.exists({"username": username});
        return resState;
    } 
)

module.exports = {setUserdB, existUserByIddB, existUserNamedB}