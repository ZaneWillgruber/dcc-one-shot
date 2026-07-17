import { Display } from '../atoms/display';
import { Label } from '../atoms/label';
import { ProgressBar } from '../atoms/progress-bar';
import { Stack } from '../atoms/stack';

const XP_CURRENT = 650;
const XP_TO_NEXT = 350;
const XP_TOTAL = XP_CURRENT + XP_TO_NEXT;

export function PlayerLevel({ level }: { level: number }) {
	const progress = (XP_CURRENT / XP_TOTAL) * 100;

	return (
		<div className="flex flex-col gap-1">
			<div className="flex justify-between">
				<Label>
					XP {XP_CURRENT}/{XP_TOTAL}
				</Label>
				<Label>{XP_TO_NEXT} to next</Label>
			</div>
			<ProgressBar progress={progress} />
		</div>
	);
}
