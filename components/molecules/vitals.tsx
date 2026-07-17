import { usePlayerContext } from '@/contexts/player-context';
import { Card } from '../atoms/card';
import { StatBar } from '../atoms/stat-bar';

export function Vitals() {
	const { health, mana } = usePlayerContext();

	return (
		<Card color="foreground">
			<div className="flex flex-col gap-2">
				<StatBar
					title="HEALTH"
					value={health.current}
					maxValue={health.max}
					color="positive"
					fromColor="negative"
				/>
				<StatBar
					title="MANA"
					value={mana.current}
					maxValue={mana.max}
					color="mana"
				/>
			</div>
		</Card>
	);
}
