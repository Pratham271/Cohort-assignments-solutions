import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080})

wss.on('connection', function(ws){
    ws.on('error', console.error)
    console.log("Server started on port 8080")

    ws.send("hello from the websocket")
})

