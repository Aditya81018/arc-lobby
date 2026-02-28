<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { leaveLobby } from './controllers';

	const lobbyId = page.params.lobbyId!;

	function handleLeaveLobby() {
		leaveLobby(lobbyId);
		goto(resolve('/'));
	}
</script>

<button class="btn btn-accent" onclick={handleLeaveLobby}>Leave Lobby</button>
