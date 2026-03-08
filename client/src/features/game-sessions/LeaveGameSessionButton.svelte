<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { leaveGameSession } from './controller';

	const lobbyId = page.params.lobbyId!;
	const gameSessionId = page.params.gameSessionId!;

	async function handleLeaveGameSession() {
		await leaveGameSession(gameSessionId);
		goto(resolve(`/${lobbyId}`));
	}
</script>

<button class="btn btn-primary" onclick={handleLeaveGameSession}>Leave Game</button>
