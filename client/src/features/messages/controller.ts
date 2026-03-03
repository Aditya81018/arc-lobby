import { uuid } from '$lib/helpers';
import { socket } from '$lib/socket';
import type { Message } from './store';

export function sendTextMessage(roomId: string, senderId: string, content: string) {
	const message: Message = {
		id: uuid(),
		roomId,
		senderId,
		type: 'text',
		content,
		timestamp: Date.now()
	};
	socket.emit('send-message', message);
}

export function sendGameInvite(roomId: string, senderId: string, gameId: string) {
	const message: Message = {
		id: uuid(),
		roomId,
		senderId,
		type: 'game-invite',
		content: gameId,
		timestamp: Date.now()
	};
	socket.emit('send-message', message);
}
