import { useEffect, useState } from "react";

const Sender = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [peerConnections, setPeerConnections] = useState<{[key: string]: RTCPeerConnection}>({});

    useEffect(()=> {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({type: 'sender'}));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "newReceiver") {
                createPeerConnection(data.receiverId);
            } else if (data.type === "createAnswer") {
                const pc = peerConnections[data.receiverId];
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
            } else if (data.type === "iceCandidate") {
                const pc = peerConnections[data.receiverId];
                pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        };

        setSocket(socket);
    }, [peerConnections]);

    async function createPeerConnection(receiverId: string) {
        if (!socket) return;

        const pc = new RTCPeerConnection();
        
        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({ type: 'createOffer', receiverId, sdp: pc.localDescription }));
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.send(JSON.stringify({ type: 'iceCandidate', receiverId, candidate: event.candidate }));
            }
        };

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        setPeerConnections(prev => ({ ...prev, [receiverId]: pc }));
    }

    async function startSendingVideo() {
        if (!socket) return;
        // Assume newReceiver messages will handle creating peer connections for each receiver
    }

    return (
        <div>
            Sender
            <div>
                <button onClick={startSendingVideo}>Send Video</button>
            </div>
        </div>
    );
};

export default Sender;
