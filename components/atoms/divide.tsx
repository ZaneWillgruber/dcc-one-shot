import { Color } from '@/types/ui';

interface DivideProps {
	orientation?: 'horizontal' | 'vertical';
	color?: Color;
}

export function Divide({ orientation = 'horizontal', color }: DivideProps) {
	const className =
		orientation === 'horizontal'
			? 'border-t border-card-divider'
			: 'border-l border-card-divider w-px self-stretch';
	const style = color ? { borderColor: color } : undefined;
	return <div className={className} style={style} />;
}
