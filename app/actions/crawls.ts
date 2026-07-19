'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { db } from '@/db';
import { crawls, players } from '@/db/schema';
import { auth } from '@/utils/auth';

export interface CreateCrawlState {
	status: 'idle' | 'success' | 'error';
	message?: string;
}

export async function createCrawl(
	_prev: CreateCrawlState,
	formData: FormData
): Promise<CreateCrawlState> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return {
			status: 'error',
			message: 'The Dungeon does not recognize you. Sign in again.',
		};
	}

	const name = formData.get('name')?.toString().trim();
	const startsAtRaw = formData.get('startsAt')?.toString();
	const startsAt = startsAtRaw ? new Date(startsAtRaw) : null;

	if (!name) {
		return { status: 'error', message: 'Every crawl needs a name.' };
	}
	if (!startsAt || Number.isNaN(startsAt.getTime())) {
		return { status: 'error', message: 'Pick a valid start time.' };
	}

	await db.transaction(async (tx) => {
		const [crawl] = await tx
			.insert(crawls)
			.values({ name, ownerId: session.user.id, startsAt })
			.returning();
		// The DM is part of the party too.
		await tx.insert(players).values({
			crawlId: crawl.id,
			userId: session.user.id,
		});
	});

	revalidatePath('/');
	return { status: 'success' };
}
