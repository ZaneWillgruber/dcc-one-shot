import { CSSProperties } from 'react';
import { Color, Fill, ItemsAlignment } from '@/types/ui';
import { mix } from '@/utils/ui/color';

export function resolveFillClass(fill?: Fill) {
	switch (fill) {
		case 'x':
			return 'w-full';
		case 'y':
			return 'h-full';
		case 'both':
			return 'w-full h-full';
		default:
			return '';
	}
}

export function resolveSpreadClass(spread: boolean = false) {
	return spread ? 'justify-between' : 'gap-2';
}

export function resolveItemsClass(items?: ItemsAlignment) {
	switch (items) {
		case 'start':
			return 'items-start';
		case 'center':
			return 'items-center';
		case 'end':
			return 'items-end';
		default:
			return '';
	}
}

export function resolveClasses(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

export function resolveStyles(...styles: (CSSProperties | undefined)[]) {
	return Object.assign({}, ...styles);
}

export function resolveGlowStyle(color: Color, glow?: boolean): CSSProperties {
	if (!glow) return {};
	return { boxShadow: `0 0 6px 2px ${mix(color, 75)}` };
}

export function resolveTextGlowStyle(
	color: Color,
	glow?: boolean
): CSSProperties {
	if (!glow) return {};
	return { textShadow: `0 0 16px ${mix(color, 85)}` };
}

export function resolveColorStyle(
	color: Color,
	opacity: number = 100
): CSSProperties {
	return { color: mix(color, opacity) };
}
