<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import LoadingScreen from '../../components/LoadingScreen.svelte';
	import { joinGameSession } from './controller';

	let { lobbyId } = page.params;
	let { gameSessionId } = $props();
	let isLoading = $state(false);

	async function handleJoinGameSession() {
		isLoading = true;
		const session = await joinGameSession(gameSessionId);
		if (session) {
			goto(resolve(`/${lobbyId}/${session.id}`));
			return;
		}

		if (!session) {
			isLoading = false;
		}
	}
</script>

{#if isLoading}
	<LoadingScreen />
{/if}
<button onclick={handleJoinGameSession} class="btn h-8 btn-xs btn-primary"> Join </button>
