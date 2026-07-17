import { Color } from '@/types/ui';
import { Label } from '../atoms/label';
import { Display } from '../atoms/display';

interface StatProps {
	label: string;
	stat: string | number;
	color?: Color;
	glow?: boolean;
	info?: string;
}
export function Stat({ label, stat, color, glow = false, info }: StatProps) {
	return (
		<div className="flex flex-col justify-center items-center gap-1">
			<Label>{label}</Label>
			<Display
				className="text-[34px] font-stat"
				color={color}
				glow={glow}
			>
				{stat}
			</Display>
			{info && <Label opacity={70}>{info}</Label>}
		</div>
	);
}
