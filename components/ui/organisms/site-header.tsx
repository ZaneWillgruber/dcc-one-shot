import { ThemeSwitch } from '../atoms/theme-switch';
import { UserMenu } from '../molecules/user-menu';

export function SiteHeader({
	name,
	email,
	image,
}: {
	name: string;
	email: string;
	image?: string | null;
}) {
	return (
		<header className="border-b border-card-divider bg-card/50">
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
				<p className="font-sans text-sm font-black uppercase tracking-[0.3em] text-foreground">
					<span className="text-accent">◆</span> DCC One Shot
				</p>
				<div className="flex items-center gap-4">
					<ThemeSwitch />
					<UserMenu name={name} email={email} image={image} />
				</div>
			</div>
		</header>
	);
}
