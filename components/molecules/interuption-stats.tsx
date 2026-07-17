import { Player } from '@/types/player-types';
import { Stat } from './stat';
import { Row } from '../atoms/row';
import { calculateDamageReduction, calculateEvade } from '@/utils/player';

export function InteruptionStats({ player }: { player: Player }) {
	return (
		<Row fill="x" className="self-start">
			<Stat
				cardColor="foreground"
				fill="x"
				label="Evade"
				value={calculateEvade(player)}
				valueColor="accent"
				items="center"
			/>
			<Stat
				cardColor="foreground"
				fill="x"
				label="Damage Red."
				value={calculateDamageReduction(player)}
				valueColor="accent"
				items="center"
			/>
		</Row>
	);
}
