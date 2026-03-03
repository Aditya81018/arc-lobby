import { writable } from 'svelte/store';
import type { UserData } from '../user/store';

export interface Lobby {
	id: string;
	members: string[];
}

export const lobbyStore = writable<Lobby | null>(null);
export const membersStore = writable<UserData[] | null>(null);
