import { Ability } from '@/types/player-types';
import { getAbilityBreakdown, getAbreviatedAbilityName } from '@/utils/ability';
import { Stat } from './stat';

export function AbilityCard({ ability }: { ability: Ability }) {
	const { enhanced, base, mod } = getAbilityBreakdown(ability);
	const modLabel = mod > 0 ? `+${mod}` : `${mod}`;
	const modColor = mod > 0 ? 'positive' : mod < 0 ? 'negative' : 'muted';
	const glow = mod !== 0;

	return (
		<div className="flex flex-col justify-center items-center gap-1">
			<Stat
				label={getAbreviatedAbilityName(ability.name)}
				stat={modLabel}
				color={modColor}
				glow={glow}
				info={`${base}/${enhanced}`}
			/>
		</div>
	);
}
