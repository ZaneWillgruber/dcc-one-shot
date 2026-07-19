import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SiteHeader } from '@/components/ui/organisms/site-header';
import { auth } from '@/utils/auth';

export default async function AuthedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect('/sign-in');
	}

	const { user } = session;

	return (
		<div className="min-h-screen bg-background">
			<SiteHeader name={user.name} email={user.email} image={user.image} />
			{children}
		</div>
	);
}
