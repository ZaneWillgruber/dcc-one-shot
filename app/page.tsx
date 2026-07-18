import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import PlayerStats from '@/components/pages/player-stats';
import { auth } from '@/utils/auth';

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect('/sign-in');
	}

	return (
		<div>
			<PlayerStats />
		</div>
	);
}
