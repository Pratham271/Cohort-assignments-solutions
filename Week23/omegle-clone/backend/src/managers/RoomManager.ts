import { User } from "./UserManager";


let GLOBAL_ROOM_ID =1;

interface Room {
    user1: User,
    user2: User,
}
export class RoomManager {

    private room: Map<string, Room>
    constructor(){
        this.room = new Map<string, Room>();
    }

    createRoom(user1: User, user2: User){
        const roomId = this.generate()
        this.room.set(roomId.toString(), {
            user1,
            user2
        })

        user1?.socket.emit("new-room", {
            type: "send-offer",
            roomId
        })
    }

    generate(){
        return GLOBAL_ROOM_ID++;
    }
}