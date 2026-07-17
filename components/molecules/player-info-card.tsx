import { Player } from '@/types/player-types';
import { Card } from '../atoms/card';
import { Row } from '../atoms/row';
import { Display } from '../atoms/display';
import { Label } from '../atoms/label';
import { ProfilePicture } from '../atoms/profile-picture';
import { PlayerLevel } from './player-level';
import { getInitials } from '@/utils/player';

export function PlayerInfoCard({ player }: { player: Player }) {
	return (
		<Card fill="x" color="foreground" className="min-w-0">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Row>
						<ProfilePicture
							src={player.image}
							alt={getInitials(player.name)}
						/>
						<div className="min-w-0 flex w-full justify-between">
							<div className="min-w-0 flex flex-col gap-1 justify-center">
								<Row>
									<Label>{player.race}</Label>
									<Label>{player.class ?? 'Unclassed'}</Label>
								</Row>
								<Display className="truncate">
									{player.name}
								</Display>
							</div>
							<div className="flex flex-col justify-center items-center">
								<Label>LVL</Label>
								<Display
									color="accent"
									glow
									className="text-[34px]"
								>
									{player.level}
								</Display>
							</div>
						</div>
					</Row>
					<PlayerLevel />
				</div>
			</div>
		</Card>
	);
}
