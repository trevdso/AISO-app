import { io } from "socket.io-client";
const socket = io("https://aiso-server.herokuapp.com/", {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
