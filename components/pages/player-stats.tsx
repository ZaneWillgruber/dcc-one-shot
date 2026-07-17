'use client';
import { usePlayerContext } from '@/contexts/player-context';
import ThemeToggle from '../molecules/theme-toggle';
import { Abilities } from '../molecules/abilities';
import { PlayerInfoCard } from '../molecules/player-info-card';
import { Stack } from '../atoms/stack';
import { calculateDamageReduction, calculateEvade } from '@/utils/player';
import { Vitals } from '../molecules/vitals';
import { ActiveEffects } from '../molecules/active-effects';
import { MediaSection } from '../molecules/media-section';
import { Hotlist } from '../molecules/hotlist';
import PlayerTabs from '../molecules/player-tabs';
import { ItemPopup } from '../molecules/item-popup';

export default function PlayerStats() {
	const { player } = usePlayerContext();

	return (
		<div className="h-screen bg-background p-8 flex justify-center overflow-hidden">
			<ItemPopup />
			<div className="flex flex-1 flex-col gap-2 max-w-7xl min-h-0">
				<div className="flex items-end justify-between border-b border-accent/30 pb-4 shrink-0">
					<div>
						<p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
							◆ Status Screen
						</p>
						<h1 className="text-3xl font-black uppercase tracking-widest text-foreground leading-none">
							Player Stats
						</h1>
					</div>
					<ThemeToggle />
				</div>
				<div className="grid grid-cols-[.25fr_.75fr] gap-2 flex-1 min-h-0 overflow-hidden">
					<Stack className="min-w-0">
						<PlayerInfoCard player={player} />
						<Vitals />
						<Stack>
							<ActiveEffects player={player} />
							<MediaSection player={player} />
						</Stack>
					</Stack>
					<div className="flex flex-col gap-2 min-w-0 overflow-hidden h-full">
						<Abilities
							abilities={player.abilities}
							move={player.move}
							step={player.step}
							evade={calculateEvade(player)}
							damageReduction={calculateDamageReduction(player)}
						/>
						<Hotlist />
						<PlayerTabs />
					</div>
				</div>
			</div>
		</div>
	);
}
