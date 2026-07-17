import { AbilityType } from './ability';

export interface Player {
	name: string;
	race: string;
	level: number;
	crawlerNumber: number;
	floor: number;
	abilities: Ability[];
	health: Pool;
	mana: Pool;
	move: number;
	step: number;
	size: string;
	aiFavor: number;
	armorScore: number;
	evadeBuffs: Buff[];
	drBuffs: Buff[];
	debuffs: string[];
	externalBuffs: string[];
	hotList: HotListItem[];
	inventory: InventoryItem[];
	media: MediaStats;
}

export interface Ability {
	name: AbilityType;
	score: number;
}

export interface Pool {
	current: number;
	max: number;
}

export interface Buff {
	name: string;
	value: number;
}

export interface HotListItem {
	icon: string;
	name: string;
	type: string;
	description: string;
}

export type EffectTarget =
	| 'health'
	| 'mana'
	| 'move'
	| 'step'
	| 'armorScore'
	| 'strength'
	| 'intelligence'
	| 'constitution'
	| 'dexterity'
	| 'charisma';

export type EffectOperation = 'add' | 'set' | 'multiply';

export interface ItemEffect {
	target: EffectTarget;
	operation: EffectOperation;
	value: number;
	label?: string;
}

export interface InventoryItem {
	icon: string;
	name: string;
	categories: string[];
	notes: string;
	quantity?: number;
	equipped?: boolean;
	usable?: boolean;
	consumedOnUse?: boolean;
	effects?: ItemEffect[];
}

export interface MediaStats {
	views: number;
	lastViews: number;
	followers: number;
	favorites: number;
}
