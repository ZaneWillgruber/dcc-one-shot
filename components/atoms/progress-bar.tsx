import { Color } from '@/types/ui';
import { mix } from '@/utils/ui/color';

interface ProgressBarProps {
	type?: 'simple' | 'block' | undefined;
	progress: number;
	color?: Color;
	glow?: boolean;
	fromColor?: Color;
}

type SimpleProgressBarProps = Omit<ProgressBarProps, 'type'>;
type BlockProgressBarProps = Omit<ProgressBarProps, 'type'>;

export function ProgressBar({
	type,
	progress,
	color,
	glow,
	fromColor,
}: ProgressBarProps) {
	color = color ?? 'accent';
	type = type ?? 'simple';
	switch (type) {
		case 'simple':
			return (
				<SimpleProgressBar
					progress={progress}
					color={color}
					glow={glow}
				/>
			);
		case 'block':
			return (
				<BlockProgressBar
					progress={progress}
					color={color}
					glow={glow}
					fromColor={fromColor}
				/>
			);
	}
}

function SimpleProgressBar({ progress, color, glow }: SimpleProgressBarProps) {
	const style = { borderColor: mix(color!, 20) };
	const barStyle = {
		width: `${progress}%`,
		backgroundColor: mix(color!, 75),
		...(glow && { boxShadow: `0 0 6px 2px ${mix(color!, 75)}` }),
	};

	return (
		<div className="w-full">
			<div
				className="w-full h-1.5 bg-card-divider border overflow-hidden"
				style={style}
			>
				<div className="h-full" style={barStyle} />
			</div>
		</div>
	);
}

const BLOCK_COUNT = 10;

function resolveColor(
	color: Color,
	fromColor: Color | undefined,
	progress: number,
	opacity: number
) {
	if (!fromColor) return mix(color, opacity);
	return `color-mix(in srgb, var(--${fromColor}) ${(100 - progress) * (opacity / 100)}%, var(--${color}) ${progress * (opacity / 100)}%)`;
}

function BlockProgressBar({
	progress,
	color,
	glow,
	fromColor,
}: BlockProgressBarProps) {
	const filled = Math.round((progress / 100) * BLOCK_COUNT);
	const bg = resolveColor(color!, fromColor, progress, 75);
	const glowColor = resolveColor(color!, fromColor, progress, 25);

	return (
		<div className="w-full flex gap-px">
			{Array.from({ length: BLOCK_COUNT }, (_, i) => (
				<div
					key={i}
					className="flex-1 h-2"
					style={{
						backgroundColor: i < filled ? bg : mix(color!, 15),
						...(glow &&
							i < filled && {
								boxShadow: `0 0 4px 1px ${glowColor}`,
							}),
					}}
				/>
			))}
		</div>
	);
}
