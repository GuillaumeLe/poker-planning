const express = require('express');
const http =  require('http');
const colyseus = require('colyseus');
const pokerRoom = require('./rooms/poker-room');
const monitor = require("@colyseus/monitor");

const port = Number(process.env.PORT || 2657);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new colyseus.Server({
    server: http.createServer(app)
});

gameServer.register("poker", pokerRoom);

// Register monitor route AFTER registering your room handlers
app.use("/colyseus", monitor.monitor(gameServer));

gameServer.listen(port);
console.log(`Listening on http://localhost:${ port }`);
