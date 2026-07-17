'use client';
import { ThemeProvider } from '@teispace/next-themes';
import { PlayerProvider } from '@/contexts/player-context';
import { Player } from '@/types/player-types';

const player: Player = {
	name: 'Zane Willgruber',
	race: 'Human',
	level: 1,
	crawlerNumber: 1,
	floor: 1,
	abilities: [
		{ name: 'strength', score: 4 },
		{ name: 'intelligence', score: 5 },
		{ name: 'constitution', score: 10 },
		{ name: 'dexterity', score: 10 },
		{ name: 'charisma', score: 10 },
	],
	health: { current: 90, max: 100 },
	mana: { current: 20, max: 40 },
	move: 30,
	step: 5,
	size: 'Medium',
	aiFavor: 3,
	armorScore: 5,
	evadeBuffs: [{ name: 'Ring of Protection', value: 1 }],
	drBuffs: [{ name: 'Resistance', value: 2 }],
	debuffs: ['Poisoned', 'Burning'],
	externalBuffs: ['Blessed', 'Haste'],
	hotList: [
		{
			icon: '⚔️',
			name: 'Rusty Longsword',
			type: 'Weapon',
			description:
				'A corroded blade found in the first room. Deals 1d8 slashing damage.',
		},
		{
			icon: '🛡️',
			name: 'Cracked Shield',
			type: 'Armor',
			description: 'A battered wooden shield. +1 to AC when wielded.',
		},
		{
			icon: '🧪',
			name: 'Healing Potion',
			type: 'Consumable',
			description: 'Restores 2d4+2 HP when consumed. Tastes like copper.',
		},
		{
			icon: '💀',
			name: 'Skull Talisman',
			type: 'Trinket',
			description:
				'A bone carving that radiates faint necromantic energy.',
		},
		{
			icon: '🗝️',
			name: 'Iron Key',
			type: 'Key',
			description:
				'Opens the door at the end of hall B. Heavy and ornate.',
		},
		{
			icon: '📜',
			name: 'Torn Map',
			type: 'Document',
			description: 'A partial map of floor 2. Missing the eastern wing.',
		},
		{
			icon: '💎',
			name: 'Blue Gemstone',
			type: 'Treasure',
			description:
				'A sapphire worth approximately 50gp. Cold to the touch.',
		},
		{
			icon: '🏹',
			name: 'Silver Arrow',
			type: 'Ammunition',
			description: 'Effective against lycanthropes. Only one remains.',
		},
		{
			icon: '🧿',
			name: 'Evil Eye',
			type: 'Trinket',
			description:
				'A glass orb that seems to watch you. Deeply unnerving.',
		},
	],
	inventory: [
		{
			icon: '⚔️',
			name: 'Rusty Longsword',
			categories: ['Weapons'],
			notes: 'A corroded blade found in the first room. Deals 1d8 slashing damage.',
			equipped: true,
		},
		{
			icon: '🛡️',
			name: 'Cracked Shield',
			categories: ['Armor'],
			notes: 'A battered wooden shield. +1 to AC when wielded.',
			equipped: true,
		},
		{
			icon: '🧪',
			name: 'Healing Potion',
			categories: ['Consumables'],
			notes: 'Restores 2d4+2 HP when consumed. Tastes like copper.',
			quantity: 3,
			usable: true,
			consumedOnUse: true,
			effects: [{ target: 'health', operation: 'add', value: 10, label: 'Restore 10 HP' }],
		},
		{
			icon: '💀',
			name: 'Skull Talisman',
			categories: ['Trinkets'],
			notes: 'A bone carving that radiates faint necromantic energy.',
		},
		{
			icon: '🗝️',
			name: 'Iron Key',
			categories: ['Key Items'],
			notes: 'Opens the door at the end of hall B. Heavy and ornate.',
		},
		{
			icon: '📜',
			name: 'Torn Map',
			categories: ['Key Items'],
			notes: 'A partial map of floor 2. Missing the eastern wing.',
		},
		{
			icon: '💎',
			name: 'Blue Gemstone',
			categories: ['Treasure'],
			notes: 'A sapphire worth approximately 50gp. Cold to the touch.',
			quantity: 2,
		},
		{
			icon: '🏹',
			name: 'Silver Arrow',
			categories: ['Weapons', 'Consumables'],
			notes: 'Effective against lycanthropes. Only one remains.',
			quantity: 1,
		},
		{
			icon: '🧿',
			name: 'Evil Eye',
			categories: ['Trinkets'],
			notes: 'A glass orb that seems to watch you. Deeply unnerving.',
		},
		{
			icon: '🔥',
			name: 'Fire Scroll',
			categories: ['Consumables'],
			notes: 'A single-use scroll that casts Fireball at 3rd level.',
			usable: true,
			consumedOnUse: true,
			effects: [],
		},
		{
			icon: '🌿',
			name: 'Antidote Herb',
			categories: ['Consumables'],
			notes: 'Removes the Poisoned condition when chewed.',
			usable: true,
			consumedOnUse: true,
			effects: [],
			quantity: 2,
		},
		{
			icon: '🪙',
			name: 'Gold Coins',
			categories: ['Treasure'],
			notes: 'Standard dungeon currency. Worth face value.',
			quantity: 48,
		},
		{
			icon: '🗡️',
			name: 'Silver Dagger',
			categories: ['Weapons'],
			notes: 'A finely balanced dagger. +1 to attack rolls against undead.',
		},
		{
			icon: '🧲',
			name: 'Lodestone Charm',
			categories: ['Trinkets', 'Key Items'],
			notes: 'Points toward magnetic anomalies. Useful for finding hidden doors.',
		},
		{
			icon: '🍖',
			name: 'Rations',
			categories: ['Consumables'],
			notes: 'Dried meat and hardtack. Keeps hunger at bay for one day.',
			quantity: 5,
		},
	],
	media: { views: 12400, lastViews: 11400, followers: 843, favorites: 291 },
};

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider enableSystem defaultTheme="system">
			<PlayerProvider player={player}>{children}</PlayerProvider>
		</ThemeProvider>
	);
}
