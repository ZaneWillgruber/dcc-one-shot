import Image from 'next/image';
import { Display } from './display';

interface ProfilePictureProps {
	src?: string;
	alt?: string;
}

export function ProfilePicture({ src, alt = '' }: ProfilePictureProps) {
	return (
		<div className="relative shrink-0 w-14.5 h-14.5">
			{src ? (
				<Image
					className="border-2 border-accent/75 bg-accent/20"
					src={src}
					alt="Player Image"
					width={75}
					height={75}
				/>
			) : (
				<div className="w-full h-full border-2 border-accent/75 bg-accent/20 flex items-center justify-center">
					<Display color="accent">{alt}</Display>
				</div>
			)}
			<span className="absolute top-0 left-0 w-3 h-3 border-t-3 border-l-3 border-accent/75" />
			<span className="absolute top-0 right-0 w-3 h-3 border-t-3 border-r-3 border-accent/75" />
			<span className="absolute bottom-0 left-0 w-3 h-3 border-b-3 border-l-3 border-accent/75" />
			<span className="absolute bottom-0 right-0 w-3 h-3 border-b-3 border-r-3 border-accent/75" />
		</div>
	);
}
