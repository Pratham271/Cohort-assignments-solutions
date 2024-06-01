import { WebSocket } from "ws"
import { uuid } from 'uuidv4';

export interface User {
    id: string
    socket: WebSocket,
    name: string
}

let GLOBAL_ROOM_ID =1;
export class UserManager{
    private users: User[];
    private queue: string[];

    constructor(){
        this.users = [];
        this.queue = [];
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
        user1?.socket.emit("new-room", {
            type: "send-offer",
            roomId
        })
    }

    onOffer(){

    }

    onAnswer(){
        
    }

    generate(){
        return GLOBAL_ROOM_ID++;
    }
}