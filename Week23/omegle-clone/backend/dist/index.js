"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', function (ws) {
    ws.on('error', console.error);
    console.log("Server started on port 8080");
    ws.send("hello from the websocket");
});
