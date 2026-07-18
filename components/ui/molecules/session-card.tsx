import { CalendarClock, Layers, Users } from 'lucide-react';
import { GameSession, GameSessionStatus } from '@/types/session-types';
import { Tag } from '../atoms/tag';
import { cx } from '../cx';

const statusTags: Record<
	GameSessionStatus,
	{ label: string; color: 'positive' | 'accent' | 'muted' }
> = {
	active: { label: 'Active', color: 'positive' },
	upcoming: { label: 'Upcoming', color: 'accent' },
	completed: { label: 'Completed', color: 'muted' },
};

export function SessionCard({ session }: { session: GameSession }) {
	const status = statusTags[session.status];
	const completed = session.status === 'completed';

	return (
		<article
			className={cx(
				'group border border-card-divider bg-card p-5 transition-colors hover:border-accent/60',
				completed && 'opacity-60'
			)}
		>
			<div className="flex items-start justify-between gap-4">
				<h3 className="font-stat text-xl font-bold uppercase tracking-wider text-foreground group-hover:text-accent">
					{session.name}
				</h3>
				<div className="flex shrink-0 gap-2">
					{session.role === 'dm' && <Tag color="accent">DM</Tag>}
					<Tag color={status.color}>{status.label}</Tag>
				</div>
			</div>
			<div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
				<span className="flex items-center gap-1.5">
					<Layers className="size-3.5" />
					Floor {session.floor}
				</span>
				<span className="flex items-center gap-1.5">
					<Users className="size-3.5" />
					{session.partySize} crawlers
				</span>
				<span className="flex items-center gap-1.5">
					<CalendarClock className="size-3.5" />
					{session.schedule}
				</span>
			</div>
		</article>
	);
}
