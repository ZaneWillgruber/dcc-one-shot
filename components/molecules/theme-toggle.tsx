'use client';
import { useTheme } from '@teispace/next-themes';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import Toggle from '../atoms/toggle';

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	// false during SSR/hydration, true after — avoids rendering a theme the server didn't
	const mounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);

	if (!mounted) {
		return <div className="h-6 w-11 rounded-full bg-foreground/20" />;
	}

	return (
		<Toggle
			checked={theme === 'dark'}
			onChange={(isDark) => setTheme(isDark ? 'dark' : 'light')}
			label="Toggle dark mode"
			iconOn={<Moon />}
			iconOff={<Sun />}
		/>
	);
}
