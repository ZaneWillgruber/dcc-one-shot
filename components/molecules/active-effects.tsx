import { Player } from '@/types/player-types';
import { Card } from '../atoms/card';
import { ConditionList } from './condition-list';
import { Label } from '../atoms/label';
import { Text } from '../atoms/text';

export function ActiveEffects({ player }: { player: Player }) {
	return (
		<Card color="foreground" fill="x">
			<div className="flex flex-col gap-2">
				<Text className="text-[12px] uppercase tracking-widest font-sans font-semibold">
					Active Effects
				</Text>
				<div className="flex flex-col gap-2">
					<Label color="negative">Debuffs</Label>
					<ConditionList
						conditions={player.debuffs}
						color="negative"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label color="positive">Buffs</Label>
					<ConditionList
						conditions={player.externalBuffs}
						color="positive"
					/>
				</div>
			</div>
		</Card>
	);
}
