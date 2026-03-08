<script>
	import LeaveGameSessionButton from '../../../features/game-sessions/LeaveGameSessionButton.svelte';
	import { currentGameSessionPlayersStore } from '../../../features/game-sessions/store';
</script>

<h1>Game Session</h1>
<LeaveGameSessionButton />
{#each $currentGameSessionPlayersStore as player, i (i)}
	<div>
		{player.name}
	</div>
{/each}
