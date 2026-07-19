'use client';

import { Toast } from '@base-ui/react/toast';
import { cx } from '../cx';

export const useSystemToasts = Toast.useToastManager;

const typeStyles: Record<string, { border: string; title: string }> = {
	error: { border: 'border-negative', title: 'text-negative' },
	success: { border: 'border-positive', title: 'text-positive' },
	default: { border: 'border-accent', title: 'text-accent' },
};

/**
 * System messages materialize in the bottom-right of the crawler's vision,
 * stack behind one another, and can be swiped away.
 */
export function SystemToaster({ children }: { children: React.ReactNode }) {
	return (
		<Toast.Provider>
			{children}
			<Toast.Portal>
				<Toast.Viewport className="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] sm:right-8 sm:bottom-8 sm:w-96">
					<SystemToastList />
				</Toast.Viewport>
			</Toast.Portal>
		</Toast.Provider>
	);
}

function SystemToastList() {
	const { toasts } = Toast.useToastManager();

	return toasts.map((toast) => {
		const style = typeStyles[toast.type ?? 'default'] ?? typeStyles.default;

		return (
			<Toast.Root
				key={toast.id}
				toast={toast}
				className={cx(
					'[--gap:0.75rem] [--offset-y:calc(var(--toast-offset-y)*-1+(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
					'absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full select-none',
					'border bg-card text-foreground shadow-[0.25rem_0.25rem_0] shadow-black/20',
					style.border,
					'[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*0.75rem)))_scale(calc(max(0,1-(var(--toast-index)*0.1))))]',
					'data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
					'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
					'data-starting-style:[transform:translateY(150%)]',
					'data-ending-style:opacity-0 data-limited:opacity-0',
					'[&[data-ending-style]:not([data-limited])]:[transform:translateY(150%)]',
					"after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']"
				)}
			>
				<Toast.Content className="flex items-start gap-4 p-4">
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<Toast.Title
							className={cx(
								'font-mono text-xs font-bold uppercase tracking-[0.25em]',
								style.title
							)}
						/>
						<Toast.Description className="text-sm text-foreground" />
					</div>
					<Toast.Close
						aria-label="Dismiss notification"
						className="shrink-0 border border-card-divider px-2 py-1 font-mono text-xs uppercase text-muted hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
					>
						✕
					</Toast.Close>
				</Toast.Content>
			</Toast.Root>
		);
	});
}
