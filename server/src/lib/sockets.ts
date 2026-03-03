import { Socket } from "socket.io";
import { createUser, deleteUser, UserData } from "../features/users";
import { getLobbyById, getLobbyOfUser, joinLobby, leaveLobby } from "../features/lobbies";
import { io } from "..";
import { initMessageSockets } from "../features/message";

export function initSocket(socket: Socket) {
  const id = socket.id;
  const data = socket.handshake.auth.data as UserData;

  createUser(id, data);

  socket.on("join-lobby", (lobbyId) => {
    joinLobby(lobbyId, id);
    socket.join(lobbyId);

    const lobby = getLobbyById(lobbyId);
    io.to(lobbyId).emit("member-update", lobby?.members);
  });

  socket.on("leave-lobby", (lobbyId) => {
    leaveLobby(lobbyId, id);
    socket.leave(lobbyId);

    const lobby = getLobbyById(lobbyId);
    io.to(lobbyId).emit("member-update", lobby?.members);
  });

  initMessageSockets(socket);

  socket.on("disconnect", () => {
    deleteUser(id);

    const lobby = getLobbyOfUser(id);
    if (lobby) {
      leaveLobby(lobby.id, id);
      io.to(lobby.id).emit("member-update", lobby?.members);
    }

    console.log("Client disconnected:", socket.id);
  });
}
