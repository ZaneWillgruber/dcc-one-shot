import { Color } from '@/types/ui';
import { Row } from './row';
import { Stack } from './stack';
import { ProgressBar } from './progress-bar';
import { Label } from './label';
import { Text } from './text';

interface StatBarProps {
	title: string;
	value: number;
	maxValue: number;
	color?: Color;
	fromColor?: Color;
}

export function StatBar({
	title,
	value,
	maxValue,
	color = 'foreground',
	fromColor,
}: StatBarProps) {
	const percentage = (value / maxValue) * 100;

	return (
		<Stack fill="x">
			<Row fill="x" spread>
				<Text className="text-[12px] tracking-widest font-sans font-semibold">
					{title}
				</Text>
				<div className="flex gap-1 items-end">
					<Text className="text-[17px] font-bold font-stat leading-none">
						{value}
					</Text>
					<Text
						opacity={50}
						className="text-[12px] font-bold font-stat leading-none"
					>
						/ {maxValue}
					</Text>
				</div>
			</Row>
			<ProgressBar
				type="block"
				progress={percentage}
				color={color}
				fromColor={fromColor}
				glow
			/>
		</Stack>
	);
}
