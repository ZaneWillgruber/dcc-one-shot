import { CSSProperties } from 'react';
import { Color } from '@/types/ui';
import {
	resolveColorStyle,
	resolveTextGlowStyle,
	resolveStyles,
} from '@/utils/ui/layout';

interface TextProps {
	children: React.ReactNode;
	color?: Color;
	opacity?: number;
	className?: string;
	glow?: boolean;
	style?: CSSProperties;
}

export function Text({
	children,
	color = 'foreground',
	opacity = 100,
	className,
	glow = false,
	style,
}: TextProps) {
	const styles: CSSProperties = resolveStyles(
		resolveColorStyle(color, opacity),
		resolveTextGlowStyle(color, glow)
	);
	style = { ...styles, ...style };
	return (
		<p className={className} style={style}>
			{children}
		</p>
	);
}
