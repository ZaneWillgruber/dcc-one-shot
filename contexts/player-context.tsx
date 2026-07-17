'use client';
import { createContext, useContext, useState } from 'react';
import { HotListItem, InventoryItem, ItemEffect, Player, Pool } from '@/types/player-types';

export interface PopupItem {
	icon: string;
	name: string;
	categories: string[];
	notes: string;
	quantity?: number;
	equipped?: boolean;
}

interface PlayerContextValue {
	player: Player;
	// mutable vitals
	health: Pool;
	mana: Pool;
	// mutable inventory
	inventory: InventoryItem[];
	useItem: (name: string) => void;
	// hotlist
	hotList: (HotListItem | null)[];
	addToHotList: (item: HotListItem) => void;
	removeFromHotList: (index: number) => void;
	replaceInHotList: (index: number, item: HotListItem) => void;
	swapHotList: (i: number, j: number) => void;
	// popup
	popupItem: PopupItem | null;
	openPopup: (item: PopupItem) => void;
	closePopup: () => void;
	// hotlist interaction modes
	swapTargetIndex: number | null;
	enterSwapMode: (index: number) => void;
	exitSwapMode: () => void;
	replaceItem: HotListItem | null;
	enterReplaceMode: (item: HotListItem) => void;
	exitReplaceMode: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({
	player,
	children,
}: {
	player: Player;
	children: React.ReactNode;
}) {
	const [health, setHealth] = useState<Pool>(player.health);
	const [mana, setMana] = useState<Pool>(player.mana);
	const [inventory, setInventory] = useState<InventoryItem[]>(player.inventory);

	const [hotList, setHotList] = useState<(HotListItem | null)[]>(() => {
		const slots: (HotListItem | null)[] = Array(10).fill(null);
		player.hotList.forEach((item, i) => { slots[i] = item; });
		return slots;
	});
	const [popupItem, setPopupItem] = useState<PopupItem | null>(null);
	const [swapTargetIndex, setSwapTargetIndex] = useState<number | null>(null);
	const [replaceItem, setReplaceItem] = useState<HotListItem | null>(null);

	function applyEffect(effect: ItemEffect) {
		switch (effect.target) {
			case 'health':
				setHealth((prev) => ({
					...prev,
					current: Math.max(0, Math.min(
						prev.max,
						effect.operation === 'add' ? prev.current + effect.value :
						effect.operation === 'multiply' ? Math.round(prev.current * effect.value) :
						effect.value
					)),
				}));
				break;
			case 'mana':
				setMana((prev) => ({
					...prev,
					current: Math.max(0, Math.min(
						prev.max,
						effect.operation === 'add' ? prev.current + effect.value :
						effect.operation === 'multiply' ? Math.round(prev.current * effect.value) :
						effect.value
					)),
				}));
				break;
			default:
				// Future stat targets: move, step, armorScore, abilities
				console.warn(`Effect target '${effect.target}' not yet implemented`);
		}
	}

	function useItem(name: string) {
		const item = inventory.find((i) => i.name === name);
		if (!item?.usable) return;

		item.effects?.forEach(applyEffect);

		if (item.consumedOnUse) {
			setInventory((prev) =>
				prev.flatMap((i) => {
					if (i.name !== name) return [i];
					if (i.quantity !== undefined && i.quantity > 1) return [{ ...i, quantity: i.quantity - 1 }];
					return [];
				})
			);
		}
	}

	function addToHotList(item: HotListItem) {
		setHotList((prev) => {
			if (prev.some((h) => h?.name === item.name)) return prev;
			const idx = prev.findIndex((h) => h === null);
			if (idx === -1) return prev;
			const next = [...prev];
			next[idx] = item;
			return next;
		});
	}

	function removeFromHotList(index: number) {
		setHotList((prev) => { const next = [...prev]; next[index] = null; return next; });
	}

	function replaceInHotList(index: number, item: HotListItem) {
		setHotList((prev) => { const next = [...prev]; next[index] = item; return next; });
	}

	function swapHotList(i: number, j: number) {
		setHotList((prev) => {
			const next = [...prev];
			[next[i], next[j]] = [next[j], next[i]];
			return next;
		});
	}

	function openPopup(item: PopupItem) { setPopupItem(item); }
	function closePopup() { setPopupItem(null); }
	function enterSwapMode(index: number) { setSwapTargetIndex(index); }
	function exitSwapMode() { setSwapTargetIndex(null); }
	function enterReplaceMode(item: HotListItem) { setReplaceItem(item); }
	function exitReplaceMode() { setReplaceItem(null); }

	return (
		<PlayerContext.Provider value={{
			player,
			health, mana,
			inventory, useItem,
			hotList, addToHotList, removeFromHotList, replaceInHotList, swapHotList,
			popupItem, openPopup, closePopup,
			swapTargetIndex, enterSwapMode, exitSwapMode,
			replaceItem, enterReplaceMode, exitReplaceMode,
		}}>
			{children}
		</PlayerContext.Provider>
	);
}

export function usePlayerContext() {
	const ctx = useContext(PlayerContext);
	if (!ctx) throw new Error('usePlayerContext must be used within PlayerProvider');
	return ctx;
}
