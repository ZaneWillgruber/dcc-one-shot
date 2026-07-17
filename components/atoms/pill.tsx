import { Color } from '@/types/ui';
import { Card } from './card';
import { Label } from './label';

interface PillProps {
	color?: Color;
	text: string;
}

export function Pill({ color, text }: PillProps) {
	return (
		<Card color={color}>
			<Label bold color={color}>
				{text}
			</Label>
		</Card>
	);
}
