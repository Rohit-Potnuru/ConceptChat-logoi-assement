const express = require('express');
const router = express.Router();

const {getUserRooms} = require('../controllers/userRoomDataController.js')

router
.route("/Users/:userId/Rooms/:type")
.get(getUserRooms)

module.exports = router;