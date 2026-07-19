'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getInitials } from '@/utils/player';
import { cx } from '../cx';

export function Avatar({
	name,
	image,
	preload,
	className,
}: {
	name: string;
	image?: string | null;
	preload?: boolean;
	className?: string;
}) {
	const [errored, setErrored] = useState(false);

	return (
		<span
			className={cx(
				'relative flex size-9 shrink-0 items-center justify-center overflow-hidden border border-accent/50 bg-card select-none',
				className
			)}
		>
			<span className="font-stat text-sm font-bold text-accent">
				{getInitials(name)}
			</span>
			{image && !errored && (
				<Image
					src={image}
					alt={name}
					fill
					sizes="36px"
					preload={preload}
					className="object-cover"
					onError={() => setErrored(true)}
				/>
			)}
		</span>
	);
}
