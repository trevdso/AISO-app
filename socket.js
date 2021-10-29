import { io } from "socket.io-client";
//production
//const url = "https://aiso-server.herokuapp.com/";
//local dev
const url = "http://localhost:3000/";

const socket = io(url, {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
