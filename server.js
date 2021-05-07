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

app.use(express.static(publicPath));


server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});
//open a socket.io connection 
io.on('connection', (socket) => {
	console.log('A user just connected to draft their Pokémon team.');
    socket.on('disconnect', () => {
        console.log('A user has disconnected from the draft.');
    })
});

socket.on('startDraft', () => {
	io.emit('startDraft');
})

socket.on('pokemonIsSelected', (data) => {
    io.emit('pokemonIsSelected', data);
});