export function abbreviateNumber(num: number): string {
	return new Intl.NumberFormat('en', {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits: 2,
	}).format(num);
}
