const express = require("express");
const socket = require("socket.io");
// http node
//https://nodejs.dev/learn/the-nodejs-http-module
const http = require("http");

const app = express();
const PORT = 3000 || process.env.PORT;

// Return a new instance of the http.Server class
const server = http.createServer(app);

// Set static folder
app.use(express.static("public"));

// Socket setup
const io = socket(server);

let users = [];
//review using this documentatio in the morning 
// https://socket.io/docs/v3/rooms/
io.on("connection", (socket) => {
  console.log("Successful socket connection", socket.id);
  // socket id shows in tebminal

  socket.on("join", (data) => {
    users.push(data);
    io.sockets.emit("join", data);
  });

  socket.on("joined", () => {
    socket.emit("joined", users);
  });
// trigger socket on key game action/function, "roll dice"
  socket.on("rollDice", (data) => {
    users[data.id].pos = data.pos;
    const turn = data.num != 6 ? (data.id + 1) % users.length : data.id;
    io.sockets.emit("rollDice", data, turn);
  });
// restart game
  socket.on("restart", () => {
    users = [];
    io.sockets.emit("restart");
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
