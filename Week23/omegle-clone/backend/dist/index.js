"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const UserManager_1 = require("./managers/UserManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const userManager = new UserManager_1.UserManager();
wss.on('connection', function (ws) {
    ws.on('error', console.error);
    console.log("Server started on port 8080");
    const userId = userManager.addUser("randomName", ws);
    ws.on('close', () => {
        userManager.removeUser(userId);
    });
    ws.send("hello from the websocket");
});
