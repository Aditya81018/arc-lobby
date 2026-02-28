<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { joinLobby, leaveLobby } from '../../features/lobby/controllers';

	const { children } = $props();
	const lobbyId = page.params.lobbyId!;
	let isLoading = $state(true);

	onMount(() => {
		handle();
		async function handle() {
			const success = await joinLobby(lobbyId);
			if (success) isLoading = false;
			else goto(resolve('/'));
		}

		return () => {
			leaveLobby(lobbyId);
		};
	});
</script>

{#if isLoading}
	<div>Joining Lobby...</div>
{:else}
	{@render children()}
{/if}
