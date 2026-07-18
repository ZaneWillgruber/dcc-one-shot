'use client';

import { useState } from 'react';
import { authClient } from '@/utils/auth-client';

export default function SignIn() {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	async function signInWithGoogle() {
		setError(null);
		setIsPending(true);

		const { error: signInError } = await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
		});

		if (signInError) {
			setError('Unable to start Google sign-in. Please try again.');
			setIsPending(false);
		}
	}

	return (
		<main className="min-h-screen bg-background flex items-center justify-center p-8">
			<div className="w-full max-w-sm border border-accent/30 bg-card p-8">
				<p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
					◆ DCC One Shot
				</p>
				<h1 className="mt-2 text-3xl font-black uppercase tracking-widest text-foreground">
					Sign in
				</h1>
				<p className="mt-3 text-sm text-muted-foreground">
					Sign in to access your player dashboard.
				</p>

				<button
					type="button"
					disabled={isPending}
					onClick={signInWithGoogle}
					className="mt-8 w-full border border-accent bg-accent px-4 py-3 font-bold uppercase tracking-wider text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isPending ? 'Redirecting…' : 'Continue with Google'}
				</button>

				{error && (
					<p role="alert" className="mt-4 text-sm text-destructive">
						{error}
					</p>
				)}
			</div>
		</main>
	);
}
