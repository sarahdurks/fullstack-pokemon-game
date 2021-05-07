const path          = require('path');
const http          = require('http');
const express       = require('express');
const socketIO      = require('socket.io');
//set our path to serve our HTML through the public folder 
const publicPath    = path.join(__dirname, '/../public');

const port          = process.env.PORT || 3001;
// call our express function
let app             = express();
//specify the http method to let HTTP connectio
let server          = http.createServer(app);
//socketIO connection
let io              = socketIO(server);

app.use(express.static(public path));


server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});
//open a socket.io connection 
io.on('connection', (socket) => {
	console.log('A user just connected.');
    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })
});

socket.on('startGame', () => {
	io.emit('startGame');
})