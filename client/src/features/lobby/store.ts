import { writable } from 'svelte/store';
import type { UserData } from '../user/store';
import { getMembersData } from './controllers';

export interface Lobby {
	id: string;
	members: string[];
}

export const lobbyStore = writable<Lobby | null>(null);
export const membersStore = writable<UserData[] | null>(null);

lobbyStore.subscribe(async (lobby) => {
	if (!lobby) {
		membersStore.set(null);
		return;
	}

	const membersData = await getMembersData(lobby.id);
	membersStore.set(membersData);
});
