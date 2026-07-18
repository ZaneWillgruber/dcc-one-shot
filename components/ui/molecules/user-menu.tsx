'use client';

import { Menu } from '@base-ui/react/menu';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/utils/auth-client';
import { Avatar } from '../atoms/avatar';

export function UserMenu({
	name,
	email,
	image,
}: {
	name: string;
	email: string;
	image?: string | null;
}) {
	const router = useRouter();

	async function signOut() {
		await authClient.signOut();
		router.push('/sign-in');
		router.refresh();
	}

	return (
		<Menu.Root>
			<Menu.Trigger
				aria-label="Crawler menu"
				className="cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
			>
				<Avatar name={name} image={image} />
			</Menu.Trigger>
			<Menu.Portal>
				<Menu.Positioner sideOffset={8} align="end">
					<Menu.Popup className="min-w-56 border border-accent/40 bg-card shadow-[0.25rem_0.25rem_0] shadow-black/20 outline-none transition-[opacity] data-starting-style:opacity-0 data-ending-style:opacity-0">
						<div className="border-b border-card-divider px-4 py-3">
							<p className="truncate font-sans text-sm font-bold uppercase tracking-wider text-foreground">
								{name}
							</p>
							<p className="mt-0.5 truncate font-mono text-xs text-muted">
								{email}
							</p>
						</div>
						<Menu.Item
							onClick={signOut}
							className="flex cursor-pointer items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground data-highlighted:bg-accent/10 data-highlighted:text-accent"
						>
							<LogOut className="size-3.5" />
							Abandon Crawl
						</Menu.Item>
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	);
}
