import { CSSProperties } from 'react';
import { Color, Fill } from '@/types/ui';
import { mix } from '@/utils/ui/color';
import { resolveFillClass } from '@/utils/ui/layout';

interface CardProps {
	children: React.ReactNode;
	color?: Color;
	fillColor?: Color;
	fit?: boolean;
	fill?: Fill;
	className?: string;
}

export function Card({
	children,
	color = 'background',
	fillColor,
	fit = false,
	fill,
	className,
}: CardProps) {
	let style: CSSProperties;
	if (fillColor) {
		style = {
			borderColor: mix(fillColor, 100),
			backgroundColor: mix(fillColor, 100),
		};
	} else {
		style = {
			borderColor: mix(color, 20),
			backgroundColor: mix(color, 3),
		};
	}

	const fillClass = resolveFillClass(fill);

	return (
		<div
			className={`border-2 py-2 px-4 ${fit ? ' w-fit' : ''}${fillClass} ${className ?? ''}`}
			style={style}
		>
			{children}
		</div>
	);
}
