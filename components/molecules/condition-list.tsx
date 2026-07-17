import { Color } from '@/types/ui';
import { Label } from '../atoms/label';
import { Row } from '../atoms/row';
import { Pill } from '../atoms/pill';

interface ConditionListProps {
	conditions: string[];
	color?: Color;
}

export function ConditionList({ conditions, color }: ConditionListProps) {
	if (conditions.length === 0) {
		return <Label color="muted">None</Label>;
	}

	return (
		<Row fill="x">
			{conditions.map((condition) => (
				<Pill key={condition} color={color} text={condition} />
			))}
		</Row>
	);
}
