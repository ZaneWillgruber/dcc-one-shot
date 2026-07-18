import { cx } from '../cx';

type TagColor = 'accent' | 'positive' | 'negative' | 'muted';

const colorClasses: Record<TagColor, string> = {
	accent: 'border-accent/50 text-accent',
	positive: 'border-positive/50 text-positive',
	negative: 'border-negative/50 text-negative',
	muted: 'border-card-divider text-muted',
};

export function Tag({
	color = 'muted',
	className,
	children,
}: {
	color?: TagColor;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<span
			className={cx(
				'inline-flex items-center border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]',
				colorClasses[color],
				className
			)}
		>
			{children}
		</span>
	);
}
