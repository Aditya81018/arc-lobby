import { Socket } from "socket.io";
import { createUser, deleteUser, UserData } from "../features/users";
import {
  getLobbyById,
  getLobbyOfUser,
  initLobbySockets,
  joinLobby,
  leaveLobby,
} from "../features/lobbies";
import { io } from "..";
import { initMessageSockets } from "../features/message";
import {
  getGameSessionOfUser,
  initGameSessionSockets,
  removePlayerFromSession,
} from "../features/game-sessions";

export function initSocket(socket: Socket) {
  const id = socket.id;
  const data = socket.handshake.auth.data as UserData;

  createUser(id, data);

  initLobbySockets(socket);
  initMessageSockets(socket);
  initGameSessionSockets(socket);

  socket.on("disconnect", () => {
    deleteUser(id);

    const lobby = getLobbyOfUser(id);
    if (lobby) {
      leaveLobby(lobby.id, id);
      io.to(lobby.id).emit("member-update", lobby?.members);
    }
    const gameSession = getGameSessionOfUser(id);
    if (gameSession) {
      removePlayerFromSession(gameSession.id, id);
      io.to(gameSession.id).emit("players-update", gameSession?.players);
    }

    console.log("Client disconnected:", socket.id);
  });
}
