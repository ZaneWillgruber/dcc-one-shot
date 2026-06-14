'use client';
import { useTheme } from '@teispace/next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import Toggle from '../atoms/toggle';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

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
