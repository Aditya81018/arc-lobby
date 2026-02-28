<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { joinLobby, leaveLobby } from '../../features/lobby/controllers';
	import { socket } from '$lib/socket';
	import { lobbyStore } from '../../features/lobby/store';

	const { children } = $props();
	const lobbyId = page.params.lobbyId!;
	let isLoading = $state(true);

	onMount(() => {
		function handleMemberUpdate(members: string[]) {
			if (!$lobbyStore) return;
			$lobbyStore.members = members;
		}

		handle();
		async function handle() {
			const success = await joinLobby(lobbyId);
			if (success) isLoading = false;
			else goto(resolve('/'));

			socket.on('member-update', handleMemberUpdate);
		}

		return () => {
			leaveLobby(lobbyId);
			socket.off('member-update', handleMemberUpdate);
		};
	});
</script>

{#if isLoading}
	<div>Joining Lobby...</div>
{:else}
	{@render children()}
{/if}
