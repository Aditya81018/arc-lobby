import { Socket } from "socket.io";
import { createUser, deleteUser, UserData } from "../features/users";
import { getLobbyOfUser, joinLobby, leaveLobby } from "../features/lobbies";

export function initSocket(socket: Socket) {
  const id = socket.id;
  const data = socket.handshake.auth.data as UserData;

  createUser(id, data);

  socket.on("join-lobby", (lobbyId) => {
    joinLobby(lobbyId, id);
    socket.join(lobbyId);
  });

  socket.on("leave-lobby", (lobbyId) => {
    leaveLobby(lobbyId, id);
    socket.leave(lobbyId);
  });

  socket.on("disconnect", () => {
    deleteUser(id);

    const lobby = getLobbyOfUser(id);
    if (lobby) {
      leaveLobby(lobby.id, id);
    }

    console.log("Client disconnected:", socket.id);
  });
}
