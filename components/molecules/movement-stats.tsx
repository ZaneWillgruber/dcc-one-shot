import { Player } from '@/types/player-types';
import { Row } from '../atoms/row';
import { Stat } from './stat';

export function MovementStats({ player }: { player: Player }) {
	return (
		<Row fill="x" className="self-start">
			<Stat
				cardColor="foreground"
				fill="x"
				label="Move"
				value={player.move}
				valueColor="accent"
				items="center"
			/>
			<Stat
				cardColor="foreground"
				fill="x"
				label="Step"
				value={player.step}
				valueColor="accent"
				items="center"
			/>
		</Row>
	);
}
