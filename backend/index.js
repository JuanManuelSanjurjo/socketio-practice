import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  // lo comento porque no estoy usando cors, sino un proxy desdeel frontend
  // cors: {
  //   origin: "http://localhost:5173",
  //   methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("A user connected");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
