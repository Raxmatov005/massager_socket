import app from "./app.ts";
import { createServer } from "http";
import { Server } from "socket.io";



const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {origin: "http://localhost:3000"}
});



io.on("connection", (socket) => {
  // ...
});

httpServer.listen(4000, () => {
    console.log("listening on port:4000")
});