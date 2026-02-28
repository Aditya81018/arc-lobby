import request from '$lib/request';
// import { get } from 'svelte/store';
// import { userData } from '../user/store';
import type { Lobby } from './store';
import { socket } from '$lib/socket';

export async function createLobby() {
  const lobby = await request<Lobby>('/lobbies/', 'POST');
  return lobby;
}

export async function getLobbyById(lobbyId: string) {
  const lobby = await request<Lobby | null>(`/lobbies/${lobbyId}`);
  return lobby;
}

export async function joinLobby(lobbyId: string) {
  const lobby = await request<boolean>(`/lobbies/${lobbyId}`);
  if (lobby) socket.emit('join-lobby', lobbyId);
  return lobby !== null;
}

export async function leaveLobby(lobbyId: string) {
  const lobby = await request<boolean>(`/lobbies/${lobbyId}`);
  if (lobby) socket.emit('leave-lobby', lobbyId);
  return lobby !== null;
}
