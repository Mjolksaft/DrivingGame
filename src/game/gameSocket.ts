import { decode, encode } from "@msgpack/msgpack";
import type { ClientMessage, MoveMessage } from "../util/types";
import { v4 as uuidv4 } from 'uuid';

export class GameSocket {
	private static instance: GameSocket | null = null;
	private socket: WebSocket | null = null;
	private id: string | null = null;
	private constructor() {
	}

	static getInstance(): GameSocket {
		if (!GameSocket.instance) {
			GameSocket.instance = new GameSocket();
			GameSocket.instance.connect();
		}
		return GameSocket.instance;
	}

	private connect() {

		this.socket = new WebSocket('ws://localhost:8080');

		this.socket.addEventListener('open', () => {
			console.log('Connected to the WebSocket server');

			// generate uuid 
			const id = uuidv4(); // save the id
			this.id = id; // store the id in the instance
			this.socket?.send(encode({ type: 'identify', id: id }));

			//create the player 
		});

		this.socket.addEventListener('message', async (event) => {
			try {
				let buffer: Uint8Array;

				if (event.data instanceof ArrayBuffer) {
					buffer = new Uint8Array(event.data);
				} else if (event.data instanceof Blob) {
					const arrayBuffer = await event.data.arrayBuffer();
					buffer = new Uint8Array(arrayBuffer);
				} else {
					throw new Error('Unsupported WebSocket message type');
				}

				const msg = decode(buffer) as ClientMessage;
				console.log('Received message from server:', msg);

				switch (msg.type) {
					case 'move':
							// check the uuid of the message
							// if the uuid is new 
							// create a nwe player object 



							// if its an already existing player set the new position for that player 
							
						break;
				
					default:
						break;
				}
			} catch (err) {
				console.error('Error decoding message:', err);
			}
		});

	}

	send(data: ClientMessage) {
		const msg = encode(data);
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(msg);
		} else {
			console.warn('Socket is not open');
		}
	}

	sendMoveMessage(position: { x: number; y: number }) {
		const message: MoveMessage = {
			type: 'move',
			position: position,
			id: this.id!, 
		};

		this.send(message);
	}
}
