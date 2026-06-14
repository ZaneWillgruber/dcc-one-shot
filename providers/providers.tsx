'use client';
import { ThemeProvider } from '@teispace/next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider enableSystem defaultTheme="system">
				{children}
			</ThemeProvider>
		</>
	);
}
