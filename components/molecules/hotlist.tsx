'use client';
import { useState } from 'react';
import { HotListItem } from '@/types/player-types';
import { usePlayerContext } from '@/contexts/player-context';
import { Card } from '../atoms/card';
import { Text } from '../atoms/text';

interface DragPayload {
	source: 'hotlist' | 'inventory';
	hotlistIndex?: number;
	item: HotListItem;
}

export function Hotlist() {
	const {
		hotList, swapHotList, replaceInHotList, openPopup,
		swapTargetIndex, exitSwapMode,
		replaceItem, exitReplaceMode,
	} = usePlayerContext();

	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	const activeMode = swapTargetIndex !== null ? 'swap' : replaceItem !== null ? 'replace' : null;

	function handleSlotClick(index: number) {
		if (swapTargetIndex !== null) {
			swapHotList(swapTargetIndex, index);
			exitSwapMode();
			return;
		}
		if (replaceItem !== null) {
			replaceInHotList(index, replaceItem);
			exitReplaceMode();
			return;
		}
		const item = hotList[index];
		if (item) {
			openPopup({
				icon: item.icon,
				name: item.name,
				categories: [item.type].filter(Boolean),
				notes: item.description,
			});
		}
	}

	function handleDragStart(e: React.DragEvent, index: number) {
		const item = hotList[index];
		if (!item) return;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData(
			'application/x-hotlist-item',
			JSON.stringify({ source: 'hotlist', hotlistIndex: index, item })
		);
	}

	function handleDragOver(e: React.DragEvent, index: number) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		setDragOverIndex(index);
	}

	function handleDragLeave() {
		setDragOverIndex(null);
	}

	function handleDrop(e: React.DragEvent, targetIndex: number) {
		e.preventDefault();
		setDragOverIndex(null);
		const raw = e.dataTransfer.getData('application/x-hotlist-item');
		if (!raw) return;
		const payload: DragPayload = JSON.parse(raw);

		if (payload.source === 'hotlist') {
			const fromIndex = payload.hotlistIndex!;
			if (fromIndex !== targetIndex) swapHotList(fromIndex, targetIndex);
		} else {
			const existingIndex = hotList.findIndex((h) => h?.name === payload.item.name);
			if (existingIndex !== -1) {
				swapHotList(existingIndex, targetIndex);
			} else {
				replaceInHotList(targetIndex, payload.item);
			}
		}
	}

	return (
		<Card color="foreground">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<Text className="text-[12px] uppercase tracking-widest font-sans font-semibold">
						Hotlist
					</Text>
					{activeMode === 'swap' && (
						<Text color="accent" className="text-[9px] font-mono uppercase tracking-widest">
							Click a slot to swap · same slot to cancel
						</Text>
					)}
					{activeMode === 'replace' && (
						<Text color="accent" className="text-[9px] font-mono uppercase tracking-widest">
							Click a slot to replace
						</Text>
					)}
				</div>
				<div className="grid grid-cols-10 gap-1">
					{hotList.map((item, i) => (
						<HotlistSlot
							key={i}
							item={item}
							isSwapTarget={swapTargetIndex === i}
							isReplaceTarget={activeMode === 'replace'}
							isDragOver={dragOverIndex === i}
							dimmed={activeMode === 'swap' && swapTargetIndex !== i}
							onClick={() => handleSlotClick(i)}
							onDragStart={(e) => handleDragStart(e, i)}
							onDragOver={(e) => handleDragOver(e, i)}
							onDragLeave={handleDragLeave}
							onDrop={(e) => handleDrop(e, i)}
						/>
					))}
				</div>
			</div>
		</Card>
	);
}

function HotlistSlot({
	item,
	isSwapTarget,
	isReplaceTarget,
	isDragOver,
	dimmed,
	onClick,
	onDragStart,
	onDragOver,
	onDragLeave,
	onDrop,
}: {
	item: HotListItem | null;
	isSwapTarget: boolean;
	isReplaceTarget: boolean;
	isDragOver: boolean;
	dimmed: boolean;
	onClick: () => void;
	onDragStart: (e: React.DragEvent) => void;
	onDragOver: (e: React.DragEvent) => void;
	onDragLeave: () => void;
	onDrop: (e: React.DragEvent) => void;
}) {
	const highlighted = isSwapTarget || isReplaceTarget || isDragOver;

	return (
		<div
			draggable={!!item}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onClick={onClick}
			className="aspect-square w-full cursor-pointer"
			style={{ opacity: dimmed ? 0.35 : 1, transition: 'opacity 0.15s' }}
		>
			<Card
				fill="both"
				color="accent"
				fillColor={highlighted ? 'accent' : undefined}
				className="!p-1"
			>
				{item ? (
					<div className="flex flex-col items-center justify-center h-full gap-0.5">
						<span className="text-xl leading-none">{item.icon}</span>
						<Text
							color={highlighted ? 'background' : 'foreground'}
							className="text-[8px] text-center font-mono leading-tight line-clamp-2"
						>
							{item.name}
						</Text>
					</div>
				) : (
					<div className="flex items-center justify-center h-full">
						<Text color="accent" opacity={isDragOver || isReplaceTarget ? 80 : 30} className="text-[10px] font-mono">
							{isDragOver || isReplaceTarget ? '→' : '—'}
						</Text>
					</div>
				)}
			</Card>
		</div>
	);
}
