import { WebSocket, WebSocketServer } from "ws";
import { UserManager } from "./managers/UserManager";

const wss = new WebSocketServer({port: 8080})
const userManager = new UserManager()

wss.on('connection', function(ws){
    ws.on('error', console.error)
    console.log("Server started on port 8080")
    const userId = userManager.addUser("randomName", ws)
    ws.on('close', () => {
        userManager.removeUser(userId)
    })
    ws.send("hello from the websocket")
})

