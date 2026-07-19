import { DoorOpen } from 'lucide-react';
import { Button } from '@/components/ui/atoms/button';
import { Panel } from '@/components/ui/atoms/panel';
import { Separator } from '@/components/ui/atoms/separator';
import { CrawlCard } from '@/components/ui/molecules/crawl-card';
import { NewCrawlDialog } from '@/components/ui/organisms/new-crawl-dialog';
import { SiteHeader } from '@/components/ui/organisms/site-header';
import { Crawl } from '@/types/crawl-types';

interface HomeProps {
	name: string;
	email: string;
	image?: string | null;
	crawls: Crawl[];
}

export default function Home({ name, email, image, crawls }: HomeProps) {
	const firstName = name.split(' ')[0];
	const activeCount = crawls.filter((c) => c.status !== 'completed').length;

	return (
		<div className="min-h-screen bg-background">
			<SiteHeader name={name} email={email} image={image} />

			<main className="mx-auto max-w-3xl px-6 py-10">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
							◆ Crawler File // {firstName}
						</p>
						<h1 className="mt-3 font-stat text-4xl font-bold uppercase tracking-widest text-foreground">
							Your Crawls
						</h1>
					</div>
					<div className="flex gap-3">
						<Button variant="ghost" className="px-3 py-2 text-xs">
							<DoorOpen className="size-3.5" />
							Join
						</Button>
						<NewCrawlDialog />
					</div>
				</div>

				<div className="mt-6 flex items-center gap-3">
					<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
						{activeCount} active
					</span>
					<Separator className="flex-1" />
				</div>

				{crawls.length > 0 ? (
					<div className="mt-4 flex flex-col gap-4">
						{crawls.map((crawl) => (
							<CrawlCard key={crawl.id} crawl={crawl} />
						))}
					</div>
				) : (
					<Panel className="mt-4 p-10 text-center">
						<p className="font-stat text-2xl font-bold uppercase tracking-widest text-foreground">
							No Crawls On Record
						</p>
						<p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
							The Dungeon grows impatient. Start a new crawl or
							join one with an invite code — it needs the
							entertainment, and you need the loot.
						</p>
					</Panel>
				)}

				<p className="mt-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted/70">
					The System reserves the right to modify, revoke, or
					weaponize any of the above at any time.
				</p>
			</main>
		</div>
	);
}
