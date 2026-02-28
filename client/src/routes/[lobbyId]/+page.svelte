<script lang="ts">
	import { page } from '$app/state';
	import { socket } from '$lib/socket';
	import LeaveLobbyButton from '../../features/lobby/LeaveLobbyButton.svelte';
	import { lobbyStore, membersStore } from '../../features/lobby/store';

	const lobbyId = page.params.lobbyId!;
</script>

<div>Your Id - {socket.id}</div>
<div class="font-bold">Lobby - {lobbyId}</div>
<LeaveLobbyButton />

{#each $membersStore as member}
	<div>{member.name}</div>
{/each}
