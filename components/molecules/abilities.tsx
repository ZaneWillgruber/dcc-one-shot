import { Ability } from '@/types/player-types';
import { AbilityCard } from './ability-card';
import { Card } from '../atoms/card';
import { Divide } from '../atoms/divide';
import { Stat } from './stat';

interface AbilitiesProps {
	abilities: Ability[];
	move: number;
	step: number;
	evade: number;
	damageReduction: number;
}

export function Abilities({
	abilities,
	move,
	step,
	evade,
	damageReduction,
}: AbilitiesProps) {
	return (
		<Card color="foreground">
			<div className="grid grid-cols-[repeat(5,1fr)_auto_repeat(4,1fr)] place-items-center">
				{abilities.flatMap((ability) => [
					<AbilityCard key={ability.name} ability={ability} />,
				])}
				<Divide orientation="vertical" />
				<Stat
					label="Move"
					stat={move}
					color="accent"
					info="ft / turn"
				/>
				<Stat
					label="Step"
					stat={step}
					color="accent"
					info="ft / reaction"
				/>
				<Stat
					label="Evade"
					stat={evade}
					color="accent"
					info="dodge bonus"
				/>
				<Stat
					label="DMG Red."
					stat={damageReduction}
					color="accent"
					info="reduction"
				/>
			</div>
		</Card>
	);
}
