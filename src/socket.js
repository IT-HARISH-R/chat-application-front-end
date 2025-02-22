import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//   transports: ["websocket", "polling"],
//   withCredentials: true,
// });

const socket = io("https://chat-application-backend-znue.onrender.com", {
    transports: ["websocket", "polling"],
    withCredentials: true,
  });
  

export default socket;
