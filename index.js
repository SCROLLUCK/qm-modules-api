import axios from "axios";
import express from "express";
import http from "http";
import { Server } from "socket.io"; // Importa Server do Socket.IO

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Cria o servidor Socket.IO

io.on("connection", (socket) => {
  socket.on("message", async (msg) => {
    // Escuta por eventos 'mensagem' do cliente
    console.log("Mensagem recebida: " + msg);

    if (msg === "GET MODULES") {
      const modules = [];
      const response = await axios.get(
        "https://api.github.com/users/modulesQuimera/repos?per_page=10000",
      );
      response.data.forEach((repo) => {
        if (repo.name.startsWith("qm-") || repo.name.startsWith("qmb-")) {
          modules.push(repo.name);
        }
      });
      io.emit("message", {
        installer: modules,
      }); // Envia a mensagem para todos os clientes
    }
  });

  socket.on("connect", (msg) => {
    // Escuta por eventos 'mensagem' do cliente
    console.log("Conexão estabelecida: " + msg);
    io.emit("message", { msg: "Conexão estabelecida" }); // Envia a mensagem para todos os clientes
  });

  socket.on("disconnect", () => {
    // Evento de desconexão
    console.log("Usuário desconectado");
  });
});

server.listen(3000, () => {
  console.log("Servidor Socket.IO rodando na porta 3000");
});
