const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");
const io = new Server(server, { cors: {origin: "*"}});

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');






const {createTestUsers, createTestRooms, createTestMembership, createTestMessage} = require('./test/createTestUsers.js')

const userRoute = require('./routes/userRoute.js')
const roomRoute = require('./routes/roomRoute.js')
const userRoomRoute = require('./routes/userRoomRoute.js')

require('dotenv/config');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
                    .then((result) => {
                                        console.log("Connected to Db");
                                        mongoose.connection.dropDatabase(); 
                                    })
                    .catch((err) => console.log(err));



app.use(express.json())
app.use(cors())

app.use('/api/users/', userRoute)
app.use('/api/rooms/', roomRoute)
app.use('/api/userrooms/', userRoomRoute)
app.get('/', async (req, res) => {
    await createTestUsers();
    await createTestRooms();
    await createTestMembership();
    await createTestMessage();
    res.status(201).json({"state":"done"})
})

const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server running on port ${PORT}...`))






const PORT1 = 3005

const {getAllMessages, postMessage} = require('./controllers/messageController.js');
const { response } = require('express');

io.on('connection', socket=> {
    console.log("We have connection!!!");

    socket.on('join', ({username, roomId}) => {
        console.log(`roomID for join connection ${roomId}`);
        socket.join(roomId);
        getAllMessages(roomId).then(result => {io.emit('recieve-join', result)} )
    });

    socket.on('send-message', ({roomId, messageData}) => {
        console.log(`for send-message roomId:${roomId}, msg:${messageData.msg}, username:${messageData.userId}`);
        postMessage(roomId, messageData).then(result => {
            socket.broadcast.to(roomId).emit('recieve-message', {message:messageData});
            io.emit('load-message',{message:messageData});
        })
    });
    socket.on('disconnect', () => {console.log("User have left???")})
})

server.listen(PORT1, () => console.log(`Server running on port ${PORT1}...`))