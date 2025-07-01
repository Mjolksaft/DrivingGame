// shared/types.ts

export type ClientId = string;

export type Position = {
	x: number;
	y: number;
};

export type MoveMessage = {
	id: ClientId;
	type: 'move';
	position: {
		x: number;
		y: number;
	};
};

export type IdentifyMessage = {
	type: 'identify';
	id: ClientId;
};

export type ServerMessage =
	| { type: 'ack'; success: boolean }
	| { type: 'update'; players: Record<ClientId, Position> };

export type ClientMessage = IdentifyMessage | MoveMessage;
