import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { cx } from '../cx';

interface SeparatorProps
	extends Omit<React.ComponentProps<typeof BaseSeparator>, 'className'> {
	className?: string;
}

export function Separator({ className, ...props }: SeparatorProps) {
	return (
		<BaseSeparator
			className={cx('h-px w-full bg-card-divider', className)}
			{...props}
		/>
	);
}
