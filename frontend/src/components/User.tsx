import { Avatar, Typography } from ".";

import { Heart as HeartIcon } from "react-feather";
import clsx from "clsx";

interface UserAvatarAndNameProps {
	name: string;
	avatarURL: string;
	supporter?: boolean;
}

export function UserAvatarAndName({
	name,
	avatarURL,
	supporter,
}: UserAvatarAndNameProps) {
	return (
		<div className="flex justify-center">
			<Avatar src={avatarURL} name={name} size="small" />
			<UserName name={name} supporter={supporter} />
		</div>
	);
}

interface UserNameProps {
	name: string;
	supporter?: boolean;
	size?: "small" | "big";
}

export function UserName({ name, supporter, size = "small" }: UserNameProps) {
	return (
		<div className="flex">
			<Typography
				boldness="slightly bold"
				largeness={size === "small" ? "small" : "huger"}>
				{name}
			</Typography>
			{supporter && <SupporterBadge size={size} />}
		</div>
	);
}

interface SupporterBadgeProps {
	size?: "small" | "big";
}

export function SupporterBadge({ size = "small" }: SupporterBadgeProps) {
	return (
		<HeartIcon
			className={clsx(
				"fill-current text-blue transform -translate-y-9",
				size === "big" && "scale-105"
			)}
		/>
	);
}
