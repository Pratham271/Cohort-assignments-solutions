import { WebSocket, WebSocketServer } from "ws";
import { UserManager } from "./managers/UserManager";

const wss = new WebSocketServer({port: 8080})
const userManager = new UserManager()

wss.on('connection', function(ws){
    ws.on('error', console.error)
    console.log("Server started on port 8080")
    userManager.addUser("randomName", ws)
    ws.on('close', () => {
        
    })
    ws.send("hello from the websocket")
})

