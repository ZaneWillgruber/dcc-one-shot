import { Fill, ItemsAlignment } from '@/types/ui';
import {
	resolveClasses,
	resolveFillClass,
	resolveItemsClass,
	resolveSpreadClass,
} from '@/utils/ui/layout';

interface StackProps {
	children: React.ReactNode;
	fill?: Fill;
	spread?: boolean;
	items?: ItemsAlignment;
	className?: string;
}

export function Stack({
	children,
	fill,
	spread = false,
	items,
	className,
}: StackProps) {
	const classes = resolveClasses(
		resolveFillClass(fill),
		resolveSpreadClass(spread),
		resolveItemsClass(items)
	);

	return (
		<div className={`flex flex-col ${classes} ${className ?? ''}`}>
			{children}
		</div>
	);
}
