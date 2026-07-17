import { Color } from '@/types/ui';
import { Text } from './text';

interface DisplayProps {
	children: React.ReactNode;
	color?: Color;
	className?: string;
	glow?: boolean;
}

export function Display({ children, color, className, glow }: DisplayProps) {
	return (
		<Text
			color={color}
			glow={glow}
			className={`font-black text-xl tabular-nums uppercase leading-none ${className ? ` ${className}` : ''}`}
		>
			{children}
		</Text>
	);
}
