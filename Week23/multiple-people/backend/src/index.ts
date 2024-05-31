import { WebSocket, WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: WebSocket | null = null;
const receiverSockets: { [key: string]: WebSocket } = {};

wss.on('connection', function (ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data: any) {
        const message = JSON.parse(data);
        if (message.type === "sender") {
            senderSocket = ws;
            console.log("sender set");
        } else if (message.type === "receiver") {
            const receiverId = uuidv4();
            receiverSockets[receiverId] = ws;
            console.log(`receiver set with ID: ${receiverId}`);

            ws.send(JSON.stringify({ type: 'receiverId', receiverId }));

            // Notify sender about the new receiver
            senderSocket?.send(JSON.stringify({ type: 'newReceiver', receiverId }));
        } else if (message.type === "createOffer") {
            const receiverId = message.receiverId;
            const receiverSocket = receiverSockets[receiverId];
            if (receiverSocket) {
                receiverSocket.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }));
                console.log(`offer received for receiver ID: ${receiverId}`);
            }
        } else if (message.type === "createAnswer") {
            senderSocket?.send(JSON.stringify({ type: "createAnswer", receiverId: message.receiverId, sdp: message.sdp }));
            console.log(`answer received from receiver ID: ${message.receiverId}`);
        } else if (message.type === "iceCandidate") {
            const receiverId = message.receiverId;
            if (ws === senderSocket) {
                const receiverSocket = receiverSockets[receiverId];
                if (receiverSocket) {
                    receiverSocket.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
                }
            } else {
                senderSocket?.send(JSON.stringify({ type: "iceCandidate", receiverId, candidate: message.candidate }));
            }
        }
    });

    ws.send("hello");
});

wss.on('close', function (ws:any) {
    // Cleanup receiverSockets if a receiver disconnects
    for (const receiverId in receiverSockets) {
        if (receiverSockets[receiverId] === ws) {
            delete receiverSockets[receiverId];
            console.log(`receiver with ID: ${receiverId} disconnected`);
            break;
        }
    }

    if (ws === senderSocket) {
        senderSocket = null;
        console.log("sender disconnected");
    }
});
