import { Color } from '@/types/ui';

export function mix(color: Color, pct: number) {
	return `color-mix(in srgb, var(--${color}) ${pct}%, transparent)`;
}
