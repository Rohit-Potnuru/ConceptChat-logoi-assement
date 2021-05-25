const asyncHandler = require('express-async-handler');

const userSchema = require('../model/userSchema.js');
const { setUserdB, existUserNamedB} = require('../dBUtils/dBUtilsUser.js');

const setUser = asyncHandler(
    async (req, res) => {
        
        const userData = req.body.user;
        
        var userres = await userSchema.create(userData);
        if(userres){
            console.log(`userCreated ${userres.username}`)
            res.status(201).json({
                userId: userres.username})
        }else{
            res.status(400).json({data:'Invalid User data'})
        }
    }
);


const checkUser = asyncHandler(
    async (req, res) => {

        const userData = { "username": req.params.username};
        var userRes = await userSchema.find(userData);
        
        if(userRes){
            res.status(201).json({
                "userId": userRes})
        }else{
            res.status(400).json({'err':'Invalid user not found'})
        }
    }
);

const getAllUser = asyncHandler(
    async (req, res) => {

        var userres = await userSchema.find();
        console.log(userres);
        if(userres){
            res.status(201).json({
                "user": userres})
        }else{
            res.status(400).json({'err': 'Invalid user data'})
            
        }
    }
);



module.exports = {setUser, checkUser, getAllUser};