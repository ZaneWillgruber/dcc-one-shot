import { Color } from '@/types/ui';
import { Text } from './text';

interface LabelProps {
	children: React.ReactNode;
	color?: Color;
	bold?: boolean;
	opacity?: number;
}

export function Label({ children, color, bold = false, opacity }: LabelProps) {
	const fontClass = bold ? 'font-extrabold' : 'font-medium';
	opacity = opacity ? 70 - (100 - opacity) : 70;
	return (
		<Text
			color={color}
			opacity={opacity}
			className={`font-mono text-[9px] leading-none uppercase tracking-widest ${fontClass}`}
		>
			{children}
		</Text>
	);
}
