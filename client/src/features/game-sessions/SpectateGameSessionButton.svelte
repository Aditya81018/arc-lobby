<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { page } from '$app/state';

	let { gameSessionId } = $props();
	const lobbyId = page.params.lobbyId!;
</script>

<button
	onclick={() => {
		goto(resolve(`/${lobbyId}/${gameSessionId}`));
	}}
	class="btn h-8 btn-xs btn-secondary"
>
	Spectate
</button>
