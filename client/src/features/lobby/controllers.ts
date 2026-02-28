import request from '$lib/request';
// import { get } from 'svelte/store';
// import { userData } from '../user/store';
import { lobbyStore, type Lobby } from './store';
import { socket } from '$lib/socket';
import type { UserData } from '../user/store';

export async function createLobby() {
	const lobby = await request<Lobby>('/lobbies/', 'POST');
	return lobby;
}

export async function getLobbyById(lobbyId: string) {
	const lobby = await request<Lobby | null>(`/lobbies/${lobbyId}`);
	return lobby;
}

export async function joinLobby(lobbyId: string) {
	const lobby = await request<Lobby | null>(`/lobbies/${lobbyId}`);
	if (lobby) {
		lobby.members.push(socket.id!);
		lobbyStore.set(lobby);
		socket.emit('join-lobby', lobbyId);
		return true;
	}
	return false;
}

export async function leaveLobby(lobbyId: string) {
	const lobby = await request<Lobby | null>(`/lobbies/${lobbyId}`);
	if (lobby) {
		lobbyStore.set(null);
		socket.emit('leave-lobby', lobbyId);
		return true;
	}
	return false;
}

export async function getMembersData(lobbyId: string) {
	const membersData = await request<UserData[]>(`/lobbies/${lobbyId}/members`);
	return membersData;
}
