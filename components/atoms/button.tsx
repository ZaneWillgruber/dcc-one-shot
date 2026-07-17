import { Color } from '@/types/ui';
import { Card } from './card';

interface ButtonProps {
	color?: Color;
	fillColor?: Color;
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

export function Button({
	color,
	fillColor,
	children,
	onClick,
	className,
}: ButtonProps) {
	return (
		<button onClick={onClick}>
			<Card className={className} color={color} fillColor={fillColor}>
				{children}
			</Card>
		</button>
	);
}
