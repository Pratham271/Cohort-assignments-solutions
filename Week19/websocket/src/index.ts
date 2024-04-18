import express from 'express'
import WebSocket,{ WebSocketServer } from 'ws'
import { createClient } from 'redis'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({server: httpServer})
const client = createClient()

async function startSocket(){
    try {
        await client.connect()
        console.log("Connected to redis")
        wss.on('connection', function connection(socket){
            socket.on('error', console.error)

            socket.on('message', function message(data, isBinary){
                const clientuserId = data
                console.log(`User ${clientuserId} connected to WebSocket`)
                client.subscribe('problem_done', (response:any)=> {
                    const {problemId, userId, status} = JSON.parse(response)
                    console.log(userId)
                    if(clientuserId == userId){
                        console.log("true")
                        wss.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN ) {
                              client.send(JSON.stringify({ problemId, status }), { binary: isBinary });
                            }
                          });
                    }
                   
                })
            })
            // socket.send("Hello from websocket server")
        })
    } catch (error) {
        console.log("Error connecting to reddis",error)
        return "Error connecting to reddis client"
    }
}

startSocket()