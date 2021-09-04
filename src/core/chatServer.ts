import { Server, Socket } from "socket.io";
import { server } from "./server";
const io = new Server(server, {});
io.on("connection", (socket: Socket) => {
  console.log("New Connection");
  console.log(socket);
});
