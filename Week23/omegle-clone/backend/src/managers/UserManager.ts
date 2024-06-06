import { WebSocket } from "ws"
import { uuid } from 'uuidv4';
import { Room, RoomManager } from "./RoomManager";

export interface User {
    id: string
    socket: WebSocket,
    name: string
}

let GLOBAL_ROOM_ID =1;
export class UserManager{
    private users: User[];
    private queue: string[];
    private rooms: Map<string, Room>;
    private roomManager: RoomManager

    constructor(){
        this.users = [];
        this.queue = [];
        this.rooms = new Map<string, Room>();
        this.roomManager= new RoomManager();
    }
    addUser(name: string, socket: WebSocket){
        const id = uuid()
        this.users.push({
            id,name, socket
        })
        this.queue.push(id)
        this.clearQueue()
    }

    removeUser(socketId: string){
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

    onOffer(roomId: string, sdp: string){
        const user2 = this.rooms.get(roomId)?.user1;
        user2?.socket.emit("offer", {
            sdp
        })
    }

    onAnswer(roomId: string, sdp: string){
        const user2 = this.rooms.get(roomId)?.user1;
        user2?.socket.emit("answer", {
            sdp
        })
    }

    generate(){
        return GLOBAL_ROOM_ID++;
    }
}