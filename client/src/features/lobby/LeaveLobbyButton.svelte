<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { SquareArrowRightExit } from '@lucide/svelte';
	import { leaveLobby } from './controllers';

	const lobbyId = page.params.lobbyId!;

	function handleLeaveLobby() {
		if (confirm('Leave this lobby?')) {
			leaveLobby(lobbyId);
			goto('/');
		}
	}
</script>

<button class="btn gap-2 text-error btn-ghost btn-sm lg:btn-md" onclick={handleLeaveLobby}>
	<SquareArrowRightExit />
	<span class="xs:inline hidden">Leave</span>
</button>
