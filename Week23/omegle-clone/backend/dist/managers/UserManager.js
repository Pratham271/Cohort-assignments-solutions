"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const uuidv4_1 = require("uuidv4");
const RoomManager_1 = require("./RoomManager");
let GLOBAL_ROOM_ID = 1;
class UserManager {
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager_1.RoomManager();
    }
    addUser(name, socket) {
        const id = (0, uuidv4_1.uuid)();
        this.users.push({
            id, name, socket
        });
        this.queue.push(id);
        socket.send("lobby");
        this.clearQueue();
        this.initHandlers(socket);
        return id;
    }
    removeUser(socketId) {
        const user = this.users.find(u => u.id === socketId);
        this.users = this.users.filter(u => u.id !== socketId);
        this.queue = this.queue.filter(q => q !== socketId);
    }
    clearQueue() {
        if (this.queue.length < 2) {
            return;
        }
        // returns the last user whose id has been popped
        const user1 = this.users.find(u => u.id === this.queue.pop());
        const user2 = this.users.find(u => u.id === this.queue.pop());
        const roomId = this.generate();
        user1 === null || user1 === void 0 ? void 0 : user1.socket.emit("send-offer", {
            roomId
        });
        if (!user1 || !user2) {
            return;
        }
        const room = this.roomManager.createRoom(user1, user2);
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onAnswer(roomId, sdp);
        });
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }
}
exports.UserManager = UserManager;
