<!-- Creates a lobby and navigates to it -->

<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createLobby } from './controllers';

	let isLoading = $state(false);
	async function handleClick() {
		isLoading = true;

		const lobby = await createLobby();

		goto(resolve(`/${lobby.id}`));
		if (!lobby) isLoading = false;
	}
</script>

<button class="btn btn-primary" disabled={isLoading} onclick={handleClick}
	>{!isLoading ? 'Create Lobby' : 'Creating Lobby...'}</button
>
