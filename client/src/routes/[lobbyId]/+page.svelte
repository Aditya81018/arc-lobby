<script lang="ts">
	import { page } from '$app/state';
	import { leaveLobby } from '../../features/lobby/controllers';
	import LeaveLobbyButton from '../../features/lobby/LeaveLobbyButton.svelte';

	const lobbyId = page.params.lobbyId!;
</script>

<div class="font-bold">Lobby - {lobbyId}</div>
<LeaveLobbyButton />
