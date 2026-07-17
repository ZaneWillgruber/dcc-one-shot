import { Color } from '@/types/ui';
import { Text } from './text';

interface BodyProps {
	children: React.ReactNode;
	color?: Color;
}

export function Body({ children, color }: BodyProps) {
	return (
		<Text
			color={color}
			className="font-semibold tabular-nums text-2xl leading-none"
		>
			{children}
		</Text>
	);
}
