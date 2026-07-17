import { Player } from '@/types/player-types';
import { getAbilityBreakdown } from './ability';

export function getInitials(name: string) {
	const parts = name.split(' ');
	if (parts.length === 1) {
		return parts[0].charAt(0).toUpperCase();
	}
	return (
		parts[0].charAt(0).toUpperCase() +
		parts[parts.length - 1].charAt(0).toUpperCase()
	);
}

export function calculateEvade(player: Player): number {
	const dex = getAbilityBreakdown(
		player.abilities.find((a) => a.name === 'dexterity')!
	).mod;
	const evadeBuffs = player.evadeBuffs.reduce(
		(sum, buff) => sum + buff.value,
		0
	);
	return dex + evadeBuffs;
}

export function calculateDamageReduction(player: Player): number {
	const armorScore = player.armorScore;
	const drBuffs = player.drBuffs.reduce((sum, buff) => sum + buff.value, 0);
	return armorScore + drBuffs;
}
