import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { getInitials } from '@/utils/player';
import { cx } from '../cx';

export function Avatar({
	name,
	image,
	className,
}: {
	name: string;
	image?: string | null;
	className?: string;
}) {
	return (
		<BaseAvatar.Root
			className={cx(
				'flex size-9 shrink-0 items-center justify-center overflow-hidden border border-accent/50 bg-card select-none',
				className
			)}
		>
			{image && (
				<BaseAvatar.Image
					src={image}
					alt={name}
					className="size-full object-cover"
				/>
			)}
			<BaseAvatar.Fallback className="font-stat text-sm font-bold text-accent">
				{getInitials(name)}
			</BaseAvatar.Fallback>
		</BaseAvatar.Root>
	);
}
