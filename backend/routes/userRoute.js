const express = require('express');
const router = express.Router();

const {setUser, checkUser, getAllUser} = require('../controllers/userController.js');


router
.route('/login/:username')
.post(checkUser)

router
.route('/')
.post(setUser)
.get(getAllUser)



module.exports = router;
//export default router