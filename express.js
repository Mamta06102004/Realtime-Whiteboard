// server side
const express = require("express");
const http = require("http"); // ADDED for Socket.IO v4
const { Server } = require("socket.io"); // UPDATED for Socket.IO v4
const path = require("path");

const app = express();
const server = http.createServer(app); // UPDATED

// UPDATED Socket.IO initialization
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (customize for production)
    methods: ["GET", "POST"]
  }
});

// serve static assets to client
app.use(express.static("public"));

// server socket handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id); // ADDED log for debugging

  socket.on("size", (size) => socket.broadcast.emit("onsize", size));
  socket.on("color", (color) => socket.broadcast.emit("oncolor", color));
  socket.on("toolchange", (tool) => socket.broadcast.emit("ontoolchange", tool));
  socket.on("hamburger", () => socket.broadcast.emit("onhamburger"));
  socket.on("mousedown", (point) => socket.broadcast.emit("onmousedown", point));
  socket.on("mousemove", (point) => socket.broadcast.emit("onmousemove", point));
  socket.on("undo", () => socket.broadcast.emit("onundo"));
  socket.on("redo", () => socket.broadcast.emit("onredo"));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id); // ADDED optional disconnect log
  });
});

// nodejs server
const port = process.env.PORT || 5500;
server.listen(port, () => {
  console.log(`Server has started at port ${port}`);
});

// // server side
// const express = require("express");
// // express server
// const app = express();
// //  nodejs
// const server = require("http").Server(app);
// // nodejs => socket enabled
// const path = require("path");
// const io = require("socket.io")(server);
// // serve static assets to client
// app.use(express.static("public"));
// // server
// io.on("connection", function(socket) {
//   socket.on("size", function(size) {
//     socket.broadcast.emit("onsize", size);
//   });
//   socket.on("color", function(color) {
//     socket.broadcast.emit("oncolor", color);
//   });

//   socket.on("toolchange", function(tool) {
//     socket.broadcast.emit("ontoolchange", tool);
//   });
//   socket.on("hamburger", function() {
//     socket.broadcast.emit("onhamburger");
//   });
//   socket.on("mousedown", function(point) {
//     socket.broadcast.emit("onmousedown", point);
//   });
//   socket.on("mousemove", function(point) {
//     socket.broadcast.emit("onmousemove", point);
//   });
//   socket.on("undo", function() {
//     socket.broadcast.emit("onundo");
//   });
//   socket.on("redo", function() {
//     socket.broadcast.emit("onredo");
//   });
// });
// // nodejs server
// const port = process.env.PORT || 5500;
// server.listen(port, function(req, res) {
//   console.log(`Server has started at port ${port}`);
// });
