import { io } from "socket.io-client";

// const socket = io("https://chat-application-backend-znue.onrender.com", {
const socket = io("http://localhost:5173/", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
