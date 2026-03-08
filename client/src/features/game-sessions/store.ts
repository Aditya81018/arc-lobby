import { writable } from 'svelte/store';
import { lobbyStore } from '../lobby/store';
import type { UserData } from '../user/store';

export interface GameSession {
	id: string;
	gameId: string;
	lobbyId: string;
	players: string[];
	settings: Record<string, unknown>;
	data: unknown;
}

export const gameSessionsStore = writable<Map<string, GameSession>>(new Map());
export const currentGameSessionStore = writable<GameSession | null>(null);
export const currentGameSessionPlayersStore = writable<UserData[] | null>(null);

lobbyStore.subscribe((lobby) => {
	if (!lobby) {
		gameSessionsStore.set(new Map());
		return;
	}
});
