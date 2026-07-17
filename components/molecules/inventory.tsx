'use client';
import { useState } from 'react';
import { InventoryItem, Player } from '@/types/player-types';
import { usePlayerContext } from '@/contexts/player-context';
import { Text } from '../atoms/text';
import { Label } from '../atoms/label';

const CATEGORY_TABS = [
	'All',
	'Weapons',
	'Armor',
	'Consumables',
	'Trinkets',
	'Key Items',
	'Treasure',
];

export function Inventory({ player: _player }: { player: Player }) {
	const { inventory, openPopup } = usePlayerContext();
	const [activeCategory, setActiveCategory] = useState('All');

	const filtered =
		activeCategory === 'All'
			? inventory
			: inventory.filter((item) => item.categories.includes(activeCategory));

	function handleRowClick(item: InventoryItem) {
		openPopup({
			icon: item.icon,
			name: item.name,
			categories: item.categories,
			notes: item.notes,
			quantity: item.quantity,
			equipped: item.equipped,
		});
	}

	return (
		<div className="flex flex-col gap-3 h-full p-2">
			{/* Category tabs */}
			<div className="flex gap-1 flex-wrap shrink-0">
				{CATEGORY_TABS.map((cat) => {
					const active = cat === activeCategory;
					return (
						<button
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className="relative pb-1"
						>
							<Text
								color={active ? 'accent' : 'foreground'}
								opacity={active ? 100 : 60}
								className="text-[10px] uppercase tracking-widest font-mono font-semibold px-1"
							>
								{cat}
							</Text>
							{active && (
								<div
									className="absolute bottom-0 left-1 right-1 h-px"
									style={{ backgroundColor: 'var(--color-accent)' }}
								/>
							)}
						</button>
					);
				})}
			</div>

			{/* Table */}
			<div className="overflow-y-auto flex-1 min-h-0">
				<table className="w-full border-collapse">
					<thead className="sticky top-0 z-10">
						<tr
							style={{
								backgroundColor:
									'color-mix(in srgb, var(--color-foreground) 8%, var(--color-background))',
								borderBottom:
									'1px solid color-mix(in srgb, var(--color-foreground) 20%, transparent)',
							}}
						>
							<th className="w-10 py-2 px-3 text-left">
								<Label> </Label>
							</th>
							<th className="py-2 pr-6 text-left">
								<Label bold>Name</Label>
							</th>
							<th className="w-14 py-2 pr-6 text-center">
								<Label bold>Qty</Label>
							</th>
							<th className="py-2 pl-4 text-left">
								<Label bold>Notes</Label>
							</th>
						</tr>
					</thead>
					<tbody>
						{filtered.length === 0 && (
							<tr>
								<td colSpan={4} className="py-8 text-center">
									<Label>No items in this category</Label>
								</td>
							</tr>
						)}
						{filtered.map((item) => (
							<TableRow
								key={item.name}
								item={item}
								onClick={() => handleRowClick(item)}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function TableRow({
	item,
	onClick,
}: {
	item: InventoryItem;
	onClick: () => void;
}) {
	function handleDragStart(e: React.DragEvent) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData(
			'application/x-hotlist-item',
			JSON.stringify({
				source: 'inventory',
				item: {
					icon: item.icon,
					name: item.name,
					type: item.categories[0] ?? '',
					description: item.notes,
				},
			})
		);
	}

	return (
		<tr
			draggable
			onClick={onClick}
			onDragStart={handleDragStart}
			className="cursor-pointer border-b"
			style={{
				borderColor:
					'color-mix(in srgb, var(--color-foreground) 10%, transparent)',
			}}
		>
			<td className="py-3 pr-3 text-center text-2xl leading-none">
				{item.icon}
			</td>
			<td className="py-3 pr-6">
				<div className="flex items-center gap-2">
					<Text
						color="foreground"
						className="text-[15px] font-sans font-medium whitespace-nowrap"
					>
						{item.name}
					</Text>
					{item.equipped && (
						<div
							className="w-2 h-2 rounded-full shrink-0"
							style={{ backgroundColor: 'var(--color-positive)' }}
						/>
					)}
				</div>
			</td>
			<td className="py-3 pr-6 text-center">
				<Text color="muted" className="text-[14px] font-mono font-bold">
					{item.quantity ?? '—'}
				</Text>
			</td>
			<td className="py-3 pl-4">
				<Text
					color="foreground"
					opacity={60}
					className="text-[13px] font-mono truncate max-w-xs"
				>
					{item.notes}
				</Text>
			</td>
		</tr>
	);
}
