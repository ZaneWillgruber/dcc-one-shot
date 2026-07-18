'use client';

import { Button as BaseButton } from '@base-ui/react/button';
import { cx } from '../cx';

type ButtonVariant = 'solid' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
	solid: 'border-accent bg-accent text-background hover:opacity-90 active:opacity-80',
	ghost: 'border-accent/50 bg-transparent text-accent hover:border-accent hover:bg-accent/10 active:bg-accent/20',
};

interface ButtonProps extends Omit<
	React.ComponentProps<typeof BaseButton>,
	'className'
> {
	variant?: ButtonVariant;
	className?: string;
}

export function Button({
	variant = 'solid',
	className,
	...props
}: ButtonProps) {
	return (
		<BaseButton
			className={cx(
				'flex items-center justify-center gap-3 border px-4 py-3 font-sans font-bold uppercase cursor-pointer tracking-widest transition-[opacity,background-color,border-color]',
				'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
				'data-disabled:cursor-not-allowed data-disabled:opacity-50',
				variantClasses[variant],
				className
			)}
			{...props}
		/>
	);
}
