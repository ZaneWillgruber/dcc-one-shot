import { Player } from '@/types/player-types';
import { Stack } from '../atoms/stack';
import { Card } from '../atoms/card';
import { abbreviateNumber } from '@/utils/numbers';
import { Text } from '../atoms/text';
import { Label } from '../atoms/label';
import { Divide } from '../atoms/divide';
import { Stat } from './stat';

export function MediaSection({ player }: { player: Player }) {
	const viewChangeColor =
		player.media.views - player.media.lastViews > 0
			? 'positive'
			: player.media.views - player.media.lastViews < 0
				? 'negative'
				: 'muted';
	const viewChangePercentage =
		player.media.lastViews > 0
			? ((player.media.views - player.media.lastViews) /
					player.media.lastViews) *
				100
			: 0;

	return (
		<Card color="foreground">
			<Stack>
				<Text className="text-[12px] uppercase tracking-widest font-sans font-semibold">
					Media
				</Text>
				<div className="flex justify-between items-end">
					<div className="flex flex-col gap-1">
						<Text
							glow
							color="accent"
							className="text-[34px] font-bold font-stat leading-none"
						>
							{abbreviateNumber(player.media.views)}
						</Text>
						<Label>VIEWS</Label>
					</div>
					<div className="flex flex-col gap-1 items-end">
						<Text
							color={viewChangeColor}
							className="text-[16px] font-bold font-stat leading-none"
						>
							{viewChangePercentage.toLocaleString('en-US', {
								minimumFractionDigits: 1,
								maximumFractionDigits: 2,
							})}
							%
						</Text>
						<Text
							opacity={50}
							className="text-[8px] uppercase tracking-widest font-mono font-normal"
						>
							24h
						</Text>
					</div>
				</div>
				<Divide />
				<div className="flex justify-between">
					<Stat
						label="Followers"
						stat={abbreviateNumber(player.media.followers)}
					/>
					<Stat
						label="Favorites"
						stat={abbreviateNumber(player.media.favorites)}
					/>
				</div>
			</Stack>
		</Card>
	);
}
