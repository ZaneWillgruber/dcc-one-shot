import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Home from '@/components/pages/home';
import { GameSession } from '@/types/session-types';
import { auth } from '@/utils/auth';

// Placeholder until game sessions live in the database — replace with a
// query for the sessions this user belongs to.
const mockSessions: GameSession[] = [
	{
		id: '1',
		name: 'The Princess Posse',
		status: 'active',
		role: 'crawler',
		floor: 3,
		partySize: 5,
		schedule: 'Fri, 7:00 PM',
	},
	{
		id: '2',
		name: 'Goblin Gauntlet',
		status: 'upcoming',
		role: 'dm',
		floor: 1,
		partySize: 4,
		schedule: 'Jul 26, 6:30 PM',
	},
	{
		id: '3',
		name: 'Meadow Lark Massacre',
		status: 'completed',
		role: 'crawler',
		floor: 2,
		partySize: 6,
		schedule: 'Last played Jun 30',
	},
];

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
			sessions={mockSessions}
		/>
	);
}
