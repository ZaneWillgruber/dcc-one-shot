'use client';

import { Switch } from '@base-ui/react/switch';
import { useTheme } from '@teispace/next-themes';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function ThemeSwitch() {
	const { resolvedTheme, setTheme } = useTheme();
	// false during SSR/hydration, true after — `resolvedTheme` is only known on
	// the client, so gating `checked` on it avoids a hydration mismatch. The
	// visuals don't wait for it: they key off `dark:` (the `data-theme`
	// attribute set before first paint), so the switch renders correctly
	// immediately.
	const mounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);
	const isDark = mounted && resolvedTheme === 'dark';

	return (
		<Switch.Root
			checked={isDark}
			onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
			aria-label="Toggle dark mode"
			className="flex h-6 w-12 cursor-pointer items-center border border-card-divider bg-card p-0.5 transition-colors dark:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
		>
			<Switch.Thumb className="flex size-4.5 items-center justify-center bg-accent text-background transition-transform dark:translate-x-6">
				<Sun className="size-3 dark:hidden" />
				<Moon className="hidden size-3 dark:block" />
			</Switch.Thumb>
		</Switch.Root>
	);
}
