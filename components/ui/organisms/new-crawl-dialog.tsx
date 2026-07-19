'use client';

import { Dialog } from '@base-ui/react/dialog';
import { Plus } from 'lucide-react';
import { useActionState, useState } from 'react';
import { CreateCrawlState, createCrawl } from '@/app/actions/crawls';
import { Button } from '../atoms/button';
import { Panel } from '../atoms/panel';
import { ScanBar } from '../atoms/scan-bar';

const initialState: CreateCrawlState = { status: 'idle' };

const inputClasses =
	'w-full border border-card-divider bg-transparent px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent';

export function NewCrawlDialog() {
	const [open, setOpen] = useState(false);
	const [state, formAction, pending] = useActionState(
		async (prev: CreateCrawlState, formData: FormData) => {
			const result = await createCrawl(prev, formData);
			if (result.status === 'success') setOpen(false);
			return result;
		},
		initialState
	);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger
				render={
					<Button className="px-3 py-2 text-xs">
						<Plus className="size-3.5" />
						New Crawl
					</Button>
				}
			/>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-40 bg-black/60 transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0" />
				<Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-3rem)] max-w-md -translate-x-1/2 -translate-y-1/2 outline-none transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0">
					<Panel className="bg-background p-8">
						<p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
							◆ System Notice
						</p>
						<Dialog.Title className="mt-3 font-stat text-3xl font-bold uppercase tracking-widest text-foreground">
							New Crawl
						</Dialog.Title>
						<Dialog.Description className="mt-3 text-sm leading-relaxed text-muted">
							Name your descent and schedule the first session.
							The Dungeon will prepare accordingly.
						</Dialog.Description>

						<form action={formAction} className="mt-6 flex flex-col gap-4">
							<label className="flex flex-col gap-1.5">
								<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
									Crawl Name
								</span>
								<input
									name="name"
									type="text"
									required
									maxLength={80}
									placeholder="The Princess Posse"
									className={inputClasses}
								/>
							</label>
							<label className="flex flex-col gap-1.5">
								<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
									First Session
								</span>
								<input
									name="startsAt"
									type="datetime-local"
									required
									className={inputClasses}
								/>
							</label>

							{state.status === 'error' && (
								<p className="font-mono text-xs uppercase tracking-[0.15em] text-negative">
									{state.message}
								</p>
							)}

							{pending && (
								<ScanBar label="Notifying the Dungeon…" />
							)}

							<div className="mt-2 flex justify-end gap-3">
								<Dialog.Close
									render={
										<Button
											variant="ghost"
											className="px-3 py-2 text-xs"
										>
											Cancel
										</Button>
									}
								/>
								<Button
									type="submit"
									disabled={pending}
									className="px-3 py-2 text-xs"
								>
									<Plus className="size-3.5" />
									{pending ? 'Descending…' : 'Create Crawl'}
								</Button>
							</div>
						</form>
					</Panel>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
