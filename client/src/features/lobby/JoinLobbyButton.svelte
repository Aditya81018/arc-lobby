<!-- 
	Accepts lobby id from input 
	then checks if it exists and navigates to it
	Note - it does not actually joins a lobby, it just checks if the lobby exists and navigates to it. Joining a lobby is handled in the lobby page itself.
-->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { getLobbyById } from './controllers';

	let modal: HTMLDialogElement;
	let lobbyId = $state('');
	let isLoading = $state(false);
	let isLobbyIdValid = $derived(lobbyId.length === 6);
	let alertMessage = $state('');

	function handleInput() {
		alertMessage = '';
		lobbyId = lobbyId
			.toUpperCase()
			.replace(/[^A-Z0-9]/g, '')
			.slice(0, 6);
	}

	async function handleSubmit() {
		isLoading = true;
		const lobby = await getLobbyById(lobbyId);
		if (lobby) goto(resolve(`/${lobbyId}`));
		else alertMessage = 'Invalid Lobby Id';
		isLoading = false;
	}
</script>

<button class="btn btn-secondary" onclick={() => modal.showModal()}>Join Lobby</button>
<dialog bind:this={modal} class="modal">
	<div class="modal-box">
		<form onsubmit={handleSubmit} class="flex flex-col items-center justify-center gap-4">
			<h3 class="text-lg font-medium">Enter Lobby ID</h3>
			<input
				class="input text-center font-mono"
				placeholder="A1B2C3"
				bind:value={lobbyId}
				oninput={handleInput}
			/>
			<button
				disabled={alertMessage !== '' || isLoading || !isLobbyIdValid}
				type="submit"
				class="btn btn-wide btn-secondary"
				>{alertMessage ? alertMessage : !isLoading ? 'Join Lobby' : 'Joining Lobby...'}</button
			>
		</form>
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
