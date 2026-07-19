'use client';

import { useState } from 'react';
import { authClient } from '@/utils/auth-client';
import { Button } from '@/components/ui/atoms/button';
import { Panel } from '@/components/ui/atoms/panel';
import { ScanBar } from '@/components/ui/atoms/scan-bar';
import { Separator } from '@/components/ui/atoms/separator';
import {
	SystemToaster,
	useSystemToasts,
} from '@/components/ui/molecules/system-toaster';

export default function SignIn() {
	return (
		<SystemToaster>
			<CrawlerGate />
		</SystemToaster>
	);
}

function CrawlerGate() {
	const toasts = useSystemToasts();
	const [isPending, setIsPending] = useState(false);

	async function signInWithGoogle() {
		setIsPending(true);

		const { error } = await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
		});

		if (error) {
			setIsPending(false);
			toasts.add({
				type: 'error',
				title: 'System Error',
				description:
					'Unable to open the Google portal. Please try again.',
			});
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-background p-6">
			<Panel className="w-full max-w-md p-8 sm:p-10">
				<p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
					◆ System Interface // Floor 1
				</p>

				<h1 className="mt-4 font-stat text-4xl font-bold uppercase tracking-widest text-foreground">
					New Crawler
					<br />
					Detected
				</h1>

				<p className="mt-4 text-sm leading-relaxed text-muted">
					The Dungeon acknowledges your presence. Register your
					identity to access your stats, inventory, and whatever
					time you have left.
				</p>

				<div className="mt-8 flex items-center gap-3">
					<Separator className="flex-1" />
					<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
						Authorized Crawlers Only
					</span>
					<Separator className="flex-1" />
				</div>

				<Button
					disabled={isPending}
					onClick={signInWithGoogle}
					className="mt-6 w-full"
				>
					<GoogleGlyph />
					{isPending ? 'Opening Portal…' : 'Authenticate with Google'}
				</Button>

				{isPending && (
					<ScanBar
						label="Contacting the Syndicate…"
						className="mt-4"
					/>
				)}

				<p className="mt-8 font-mono text-[10px] leading-relaxed uppercase tracking-[0.2em] text-muted/70">
					By descending you accept the terms of the Crawl.
					<br />
					Survival is not guaranteed. Good luck, Crawler.
				</p>
			</Panel>
		</main>
	);
}

function GoogleGlyph() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0">
			<path
				fill="currentColor"
				d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 2.98-4.3 2.98-7.35Z"
			/>
			<path
				fill="currentColor"
				fillOpacity="0.75"
				d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.75-5.59-4.1H3.06v2.58A10 10 0 0 0 12 22Z"
			/>
			<path
				fill="currentColor"
				fillOpacity="0.55"
				d="M6.41 13.93a6 6 0 0 1 0-3.86V7.49H3.06a10 10 0 0 0 0 9.02l3.35-2.58Z"
			/>
			<path
				fill="currentColor"
				fillOpacity="0.9"
				d="M12 5.97c1.47 0 2.78.5 3.82 1.5l2.86-2.86A9.97 9.97 0 0 0 12 2a10 10 0 0 0-8.94 5.49l3.35 2.58C7.2 7.72 9.4 5.97 12 5.97Z"
			/>
		</svg>
	);
}
