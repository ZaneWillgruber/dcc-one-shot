'use client';
import { usePlayerContext } from '@/contexts/player-context';
import { Card } from '../atoms/card';
import { Text } from '../atoms/text';
import { Label } from '../atoms/label';
import { Pill } from '../atoms/pill';
import { Button } from '../atoms/button';
import { Row } from '../atoms/row';

export function ItemPopup() {
	const {
		inventory,
		hotList,
		popupItem,
		closePopup,
		addToHotList,
		removeFromHotList,
		enterSwapMode,
		enterReplaceMode,
		consumeItem,
	} = usePlayerContext();

	if (!popupItem) return null;

	const inventoryItem = inventory.find((i) => i.name === popupItem.name);
	const hotlistIndex = hotList.findIndex((h) => h?.name === popupItem.name);
	const isInHotlist = hotlistIndex !== -1;
	const hotlistFull = hotList.every((h) => h !== null);

	function handleAddToHotlist() {
		if (!inventoryItem) return;
		addToHotList({
			icon: inventoryItem.icon,
			name: inventoryItem.name,
			type: inventoryItem.categories[0] ?? '',
			description: inventoryItem.notes,
		});
		closePopup();
	}

	function handleReplaceInHotlist() {
		if (!inventoryItem) return;
		enterReplaceMode({
			icon: inventoryItem.icon,
			name: inventoryItem.name,
			type: inventoryItem.categories[0] ?? '',
			description: inventoryItem.notes,
		});
		closePopup();
	}

	function handleUse() {
		if (!popupItem) return;
		consumeItem(popupItem.name);
		closePopup();
	}

	function handleRemoveFromHotlist() {
		removeFromHotList(hotlistIndex);
		closePopup();
	}

	function handleSwap() {
		enterSwapMode(hotlistIndex);
		closePopup();
	}

	return (
		<div
			className="fixed inset-0 flex items-center justify-center z-50"
			onClick={closePopup}
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0"
				style={{ backgroundColor: 'color-mix(in srgb, var(--color-background) 75%, transparent)' }}
			/>

			{/* Card */}
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative w-80"
				style={{ backgroundColor: 'var(--color-background)' }}
			>
				<Card color="foreground" className="flex flex-col gap-4 !py-4">
					{/* Header */}
					<div className="flex items-start justify-between gap-2">
						<div className="flex items-center gap-3">
							<span className="text-4xl leading-none">{popupItem.icon}</span>
							<div className="flex flex-col gap-1.5">
								<Text className="text-[15px] font-sans font-semibold leading-tight">
									{popupItem.name}
								</Text>
								<Row className="gap-1 flex-wrap">
									{popupItem.categories.map((cat) => (
										<Pill key={cat} color="accent" text={cat} />
									))}
									{popupItem.equipped && <Pill color="positive" text="Equipped" />}
									{isInHotlist && <Pill color="muted" text="In Hotlist" />}
								</Row>
							</div>
						</div>
						<button
							onClick={closePopup}
							className="shrink-0 mt-0.5 opacity-40 hover:opacity-100 transition-opacity"
						>
							<Text className="text-[18px] font-mono leading-none">×</Text>
						</button>
					</div>

					<div
						className="border-t"
						style={{ borderColor: 'color-mix(in srgb, var(--color-foreground) 20%, transparent)' }}
					/>

					<Text className="text-[12px] font-mono leading-relaxed" opacity={75}>
						{popupItem.notes}
					</Text>

					{popupItem.quantity !== undefined && (
						<Row spread>
							<Label>Quantity</Label>
							<Text className="text-[13px] font-mono font-bold">{popupItem.quantity}</Text>
						</Row>
					)}

					<div
						className="border-t"
						style={{ borderColor: 'color-mix(in srgb, var(--color-foreground) 20%, transparent)' }}
					/>

					{/* Effects preview */}
					{inventoryItem?.usable && inventoryItem.effects && inventoryItem.effects.length > 0 && (
						<div className="flex flex-col gap-1">
							{inventoryItem.effects.map((effect, i) => (
								<Row key={i} spread>
									<Label>{effect.label ?? `${effect.target} ${effect.operation}`}</Label>
									<Text className="text-[11px] font-mono font-bold" color={effect.value >= 0 ? 'positive' : 'negative'}>
										{effect.operation === 'add' && effect.value > 0 ? '+' : ''}{effect.value}
									</Text>
								</Row>
							))}
						</div>
					)}

					{/* Actions */}
					<div className="flex flex-col gap-2">
						{inventoryItem?.usable && (
							<Button fillColor="positive" onClick={handleUse}>
								<Text color="background" className="text-[11px] uppercase tracking-widest font-sans font-semibold text-center">
									Use
								</Text>
							</Button>
						)}
						{inventoryItem && !isInHotlist && (
							<Button
								fillColor="accent"
								onClick={hotlistFull ? handleReplaceInHotlist : handleAddToHotlist}
							>
								<Text
									color="background"
									className="text-[11px] uppercase tracking-widest font-sans font-semibold text-center"
								>
									{hotlistFull ? 'Replace in Hotlist' : 'Add to Hotlist'}
								</Text>
							</Button>
						)}
						{isInHotlist && (
							<Row className="gap-2">
								<Button color="accent" onClick={handleSwap} className="flex-1">
									<Text color="accent" className="text-[11px] uppercase tracking-widest font-sans font-semibold text-center">
										Swap Slot
									</Text>
								</Button>
								<Button color="negative" onClick={handleRemoveFromHotlist} className="flex-1">
									<Text color="negative" className="text-[11px] uppercase tracking-widest font-sans font-semibold text-center">
										Remove
									</Text>
								</Button>
							</Row>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
}
