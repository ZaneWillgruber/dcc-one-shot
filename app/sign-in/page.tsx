import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import SignIn from '@/components/pages/sign-in';
import { auth } from '@/utils/auth';

export default async function SignInPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect('/');
	}

	return <SignIn />;
}
