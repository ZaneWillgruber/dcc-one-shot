'use client';

import { Progress } from '@base-ui/react/progress';
import { cx } from '../cx';

/**
 * Indeterminate activity bar — a sliver of accent light sweeping the track
 * while the System does whatever the System does.
 */
export function ScanBar({
	label,
	className,
}: {
	label: string;
	className?: string;
}) {
	return (
		<Progress.Root value={null} className={cx('w-full', className)}>
			<Progress.Label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
				{label}
			</Progress.Label>
			<Progress.Track className="mt-1.5 h-1 w-full overflow-hidden bg-card-divider">
				<Progress.Indicator className="h-full w-1/3 animate-scan bg-accent" />
			</Progress.Track>
		</Progress.Root>
	);
}
