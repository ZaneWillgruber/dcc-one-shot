export type GameSessionStatus = 'active' | 'upcoming' | 'completed';

export type GameSessionRole = 'dm' | 'crawler';

export interface GameSession {
	id: string;
	name: string;
	status: GameSessionStatus;
	/** The signed-in user's role in this session. */
	role: GameSessionRole;
	floor: number;
	partySize: number;
	/** Human-readable schedule or last-played line, e.g. "Fri, 7:00 PM". */
	schedule: string;
}
