import { User as UserIcon } from "react-feather";
import clsx from "clsx";

interface AvatarProps {
	src?: string;
	name: string;
	size?: "small" | "bigger" | "humongous";
}

export function Avatar({ src, name, size = "small" }: AvatarProps) {
	const altText = `${name}'s avatar`;
	const imageClasses = clsx(
		"rounded-full w-full h-full bg-blue text-white stroke-inital"
	);

	return (
		<div
			className={clsx(
				"MicroAvatar rounded-full",
				size === "small"
					? "w-30 h-30"
					: size === "bigger"
					? "w-40 h-40"
					: "w-100 h-100"
			)}
			title={altText}
		>
			{src ? (
				<img src={src} alt={altText} className={imageClasses} />
			) : (
				<UserIcon className={imageClasses} />
			)}
		</div>
	);
}
