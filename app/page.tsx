import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Home from '@/components/pages/home';
import { db } from '@/db';
import { crawls, players } from '@/db/schema';
import { Crawl } from '@/types/crawl-types';
import { auth } from '@/utils/auth';

type CrawlRow = typeof crawls.$inferSelect & {
	players: (typeof players.$inferSelect)[];
};

const scheduleFormat = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	hour: 'numeric',
	minute: '2-digit',
});

function toCrawl(row: CrawlRow, userId: string): Crawl {
	return {
		id: row.id,
		name: row.name,
		status: row.startsAt > new Date() ? 'upcoming' : 'active',
		role: row.ownerId === userId ? 'dm' : 'crawler',
		floor: row.floor,
		partySize: row.players.length,
		schedule: scheduleFormat.format(row.startsAt),
	};
}

async function getCrawlsForUser(userId: string): Promise<Crawl[]> {
	const [owned, memberships] = await Promise.all([
		db.query.crawls.findMany({
			where: eq(crawls.ownerId, userId),
			with: { players: true },
		}),
		db.query.players.findMany({
			where: eq(players.userId, userId),
			with: { crawl: { with: { players: true } } },
		}),
	]);

	const byId = new Map<string, CrawlRow>();
	for (const row of [...owned, ...memberships.map((m) => m.crawl)]) {
		byId.set(row.id, row);
	}

	return [...byId.values()]
		.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
		.map((row) => toCrawl(row, userId));
}

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect('/sign-in');
	}

	const { user } = session;

	return (
		<Home
			name={user.name}
			email={user.email}
			image={user.image}
			crawls={await getCrawlsForUser(user.id)}
		/>
	);
}
