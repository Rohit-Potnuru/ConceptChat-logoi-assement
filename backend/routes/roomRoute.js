const express = require('express');
const router = express.Router();

const {createRoom, addMember, confirmMember} = require('../controllers/roomController.js');
const {getAllMessages, postMessage} = require('../controllers/messageController.js')



router
.route('/Rooms/:roomId/Users/:userId')
.put(confirmMember)

router
.route('/Rooms/:roomId/Users/:type')
.post(addMember)

router
.route('/Rooms/:roomId/Messages')
.get(getAllMessages)
.post(postMessage)


router
.route('/Rooms')
.post(createRoom)




module.exports = router;
//export default router