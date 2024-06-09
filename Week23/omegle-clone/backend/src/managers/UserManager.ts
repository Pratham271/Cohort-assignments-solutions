import { WebSocket } from "ws"
import { uuid } from 'uuidv4';
import { RoomManager } from "./RoomManager";

export interface User {
    id: string
    socket: WebSocket,
    name: string
}

let GLOBAL_ROOM_ID =1;
export class UserManager{
    private users: User[];
    private queue: string[];
    
    private roomManager: RoomManager

    constructor(){
        this.users = [];
        this.queue = [];
        this.roomManager= new RoomManager();
    }
    addUser(name: string, socket: WebSocket){
        const id = uuid()
        this.users.push({
            id,name, socket
        })
        this.queue.push(id)
        socket.send("lobby")
        this.clearQueue()
        this.initHandlers(socket)
        return id
    }

    removeUser(socketId: string){
        const user = this.users.find(u => u.id === socketId);
        
        this.users = this.users.filter(u => u.id !== socketId)
        this.queue = this.queue.filter(q => q !== socketId)
    }

    clearQueue(){
        if(this.queue.length <2){
            return;
        }
        // returns the last user whose id has been popped
        const user1 = this.users.find(u => u.id === this.queue.pop())
        const user2 = this.users.find(u => u.id === this.queue.pop())
        const roomId = this.generate();
        user1?.socket.emit("send-offer", {
            roomId
        })
        if(!user1 || !user2){
            return
        }

        const room = this.roomManager.createRoom(user1,user2)
    }

    initHandlers(socket:WebSocket){
        socket.on("offer", ({sdp, roomId}: {sdp:string, roomId: string}) => {
            this.roomManager.onOffer(roomId, sdp)
        })
        socket.on("answer", ({sdp, roomId}: {sdp:string, roomId: string}) => {
            this.roomManager.onAnswer(roomId, sdp)
        })
    }
    
    generate(){
        return GLOBAL_ROOM_ID++;
    }
}