import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ['websocket'],
            withCredentials: true,
        });

        socket.emit("join-room", "default-room");
    }

    return socket;
};
