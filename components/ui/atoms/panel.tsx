import { cx } from '../cx';

const cornerBase = 'pointer-events-none absolute size-3 border-accent';

/**
 * A System-interface panel: bordered card with bracketed corners, the frame
 * every message from the Dungeon arrives in.
 */
export function Panel({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={cx(
				'relative border border-accent/30 bg-card',
				className
			)}
		>
			<span className={cx(cornerBase, '-top-px -left-px border-t-2 border-l-2')} />
			<span className={cx(cornerBase, '-top-px -right-px border-t-2 border-r-2')} />
			<span className={cx(cornerBase, '-bottom-px -left-px border-b-2 border-l-2')} />
			<span className={cx(cornerBase, '-bottom-px -right-px border-b-2 border-r-2')} />
			{children}
		</div>
	);
}
