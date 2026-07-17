import { Fill } from '@/types/ui';
import {
	resolveClasses,
	resolveFillClass,
	resolveSpreadClass,
} from '@/utils/ui/layout';

interface RowProps {
	children: React.ReactNode;
	spread?: boolean;
	fill?: Fill;
	className?: string;
}

export function Row({ children, spread = false, fill, className }: RowProps) {
	const classes = resolveClasses(
		resolveFillClass(fill),
		resolveSpreadClass(spread)
	);

	return (
		<div className={`flex ${classes} ${className ?? ''}`}>{children}</div>
	);
}
