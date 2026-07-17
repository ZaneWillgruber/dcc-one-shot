import { Player } from '@/types/player-types';
import { Card } from '../atoms/card';
import { Text } from '../atoms/text';
import { useState } from 'react';
import { Button } from '../atoms/button';
import { Inventory } from './inventory';

interface TabDetail {
	title: string;
	content?: React.ReactNode;
	active?: boolean;
}

export default function PlayerTabs({ player }: { player: Player }) {
	const tabs: TabDetail[] = [
		{ title: 'Inventory', content: <Inventory player={player} /> },
		{ title: 'Stats' },
		{ title: 'Quests' },
		{ title: 'Map' },
	];

	const [activeTab, setActiveTab] = useState(0);

	function handleTabChange(index: number) {
		setActiveTab(index);
	}

	return (
		<div className="flex flex-col gap-2 flex-1 min-h-0">
			<div className="flex gap-2 shrink-0">
				{tabs.map((tab, index) => (
					<div key={index} onClick={() => handleTabChange(index)}>
						<Tab title={tab.title} active={activeTab === index} />
					</div>
				))}
			</div>
			<Card color="foreground" className="flex-1 min-h-0 overflow-hidden">
				{tabs[activeTab].content || (
					<div className="flex items-center justify-center h-full">
						<Text className="text-sm text-gray-500">
							Content coming soon...
						</Text>
					</div>
				)}
			</Card>
		</div>
	);
}

function Tab({ title, active }: TabDetail) {
	if (active) {
		return (
			<Button fillColor="accent">
				<Text
					color="background"
					className="text-[13px] uppercase tracking-widest font-sans font-semibold"
				>
					{title}
				</Text>
			</Button>
		);
	}

	return (
		<Button color="foreground">
			<Text
				color="foreground"
				className="text-[13px] uppercase tracking-widest font-sans font-semibold"
			>
				{title}
			</Text>
		</Button>
	);
}
