'use client';

import { Switch } from '@base-ui/react/switch';
import { useTheme } from '@teispace/next-themes';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	// false during SSR/hydration, true after — avoids rendering a theme the server didn't
	const mounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);

	if (!mounted) {
		return <div className="h-6 w-12 border border-card-divider bg-card" />;
	}

	const isDark = theme === 'dark';

	return (
		<Switch.Root
			checked={isDark}
			onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
			aria-label="Toggle dark mode"
			className="flex h-6 w-12 cursor-pointer items-center border border-card-divider bg-card p-0.5 transition-colors data-checked:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
		>
			<Switch.Thumb className="flex size-4.5 items-center justify-center bg-accent text-background transition-transform data-checked:translate-x-6">
				{isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
			</Switch.Thumb>
		</Switch.Root>
	);
}
