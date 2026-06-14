'use client';

import { ReactNode } from 'react';

interface ToggleProps {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	label?: string;
	iconOn?: ReactNode;
	iconOff?: ReactNode;
}

export default function Toggle({
	checked = false,
	onChange,
	disabled = false,
	label,
	iconOn,
	iconOff,
}: ToggleProps) {
	const icon = checked ? iconOn : iconOff;

	return (
		<button
			role="switch"
			aria-checked={checked}
			aria-label={label}
			disabled={disabled}
			onClick={() => onChange?.(!checked)}
			className={[
				'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				checked ? 'bg-foreground' : 'bg-foreground/20',
			].join(' ')}
		>
			<span
				className={[
					'pointer-events-none inline-flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-200',
					checked ? 'translate-x-5' : 'translate-x-0',
				].join(' ')}
			>
				{icon && (
					<span className="text-foreground [&>svg]:h-3 [&>svg]:w-3">
						{icon}
					</span>
				)}
			</span>
		</button>
	);
}
