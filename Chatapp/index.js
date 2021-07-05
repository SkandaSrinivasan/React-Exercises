const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const sockServer = require('socket.io')
const io = new sockServer.Server(server)
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    socket.on('Message', (msg) => {
        console.log('Message :', msg)
    })
})

server.listen(3001, () => {
    console.log('listening on 3001');
})