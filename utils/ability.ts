import { AbilityType } from '@/types/ability';
import { Ability } from '@/types/player-types';

export function getAbilityBreakdown(ability: Ability) {
	const enhanced = ability.score * 2;
	return {
		enhanced: enhanced,
		base: ability.score,
		mod: Math.floor((enhanced - 10) / 2),
	};
}

export function getAbreviatedAbilityName(abilityType: AbilityType) {
	switch (abilityType) {
		case 'strength':
			return 'STR';
		case 'dexterity':
			return 'DEX';
		case 'constitution':
			return 'CON';
		case 'intelligence':
			return 'INT';
		case 'wisdom':
			return 'WIS';
		case 'charisma':
			return 'CHA';
		default:
			return String(abilityType).substring(0, 3).toUpperCase();
	}
}
