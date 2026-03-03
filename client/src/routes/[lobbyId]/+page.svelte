<script lang="ts">
	import { page } from '$app/state';
	import { socket } from '$lib/socket';
	import { getMemberFromId } from '../../features/lobby/controllers';
	import LeaveLobbyButton from '../../features/lobby/LeaveLobbyButton.svelte';
	import { membersStore } from '../../features/lobby/store';
	import { sendTextMessage } from '../../features/messages/controller';
	import { lobbyMessagesStore } from '../../features/messages/store';

	const lobbyId = page.params.lobbyId!;
	let message = '';

	function handleSendTextMessage() {
		if (message.trim() === '') return;
		sendTextMessage(lobbyId, socket.id!, message);
		message = '';
	}
</script>

<div class="drawer h-screen bg-base-200 lg:drawer-open">
	<input id="member-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content flex h-screen flex-col overflow-hidden">
		<header class="navbar shrink-0 border-b border-base-300 bg-base-100 px-4">
			<div class="flex flex-1 gap-2">
				<label for="member-drawer" class="btn btn-ghost btn-sm lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</label>
				<div class="flex flex-col justify-center">
					<span class="text-xs leading-none font-bold uppercase opacity-50">Lobby</span>
					<span class="font-mono font-bold text-primary">#{lobbyId}</span>
				</div>
			</div>
			<div class="flex-none">
				<LeaveLobbyButton />
			</div>
		</header>

		<main class="flex-1 space-y-4 overflow-y-auto p-4">
			{#each $lobbyMessagesStore as msg}
				{@const isMe = msg.senderId === socket.id}
				<div class="chat {isMe ? 'chat-end' : 'chat-start'}">
					<div class="chat-header mb-1 text-xs opacity-50">
						{getMemberFromId(msg.senderId)?.name || 'Unknown'}
					</div>
					<div
						class="chat-bubble {isMe
							? 'chat-bubble-primary'
							: 'chat-bubble-secondary text-secondary-content'}"
					>
						{msg.content}
					</div>
				</div>
			{:else}
				<div class="h-full flex flex-col items-center justify-center opacity-20">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-12 w-12 mb-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
					<p class="text-sm italic">No messages yet</p>
				</div>
			{/each}
		</main>

		<form
			class="flex shrink-0 gap-2 border-t border-base-300 bg-base-100 p-4"
			onsubmit={(e) => {
				e.preventDefault();
				handleSendTextMessage();
			}}
		>
			<input
				class="input-bordered input flex-1"
				type="text"
				placeholder="Type a message..."
				bind:value={message}
			/>
			<button class="btn px-6 btn-primary" type="submit" disabled={!message.trim()}> Send </button>
		</form>
	</div>

	<div class="drawer-side z-50">
		<label for="member-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="menu min-h-full w-72 border-r border-base-300 bg-base-100 p-0">
			<div class="flex items-center justify-between border-b border-base-300 bg-base-200/50 p-4">
				<h2 class="text-lg font-bold">Members</h2>
				<div class="badge badge-primary">{$membersStore?.length}</div>
			</div>
			<ul class="space-y-1 p-2">
				{#each $membersStore as member}
					<li>
						<div
							class="flex items-center gap-3 {member.id === socket.id
								? 'bg-primary/10 font-medium text-primary'
								: ''}"
						>
							<span class="flex-1 truncate">{member.name}</span>
							{#if member.id === socket.id}
								<span class="badge badge-sm badge-primary">You</span>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
