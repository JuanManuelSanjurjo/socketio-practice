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
  console.log("A nuevo cliente se ha conectado");

  socket.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // en vez de loguearlo se puede guardar en una base de datos

    // se puede enviar el mensaje a todos los clientes conectados con broadcast
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id.slice(6),
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
