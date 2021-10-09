import React, { useEffect, useState } from "react";

import NextImage from "next/image";
import { User as UserIcon } from "react-feather";
import clsx from "clsx";

function useLoaded(src?: string, dontUseNextImage?: boolean) {
	const [loaded, setLoaded] = useState<"loaded" | "error" | false>(false);

	useEffect(() => {
		if (!dontUseNextImage) return undefined;

		if (!src) return undefined;

		setLoaded(false);

		let active = true;

		function onLoad() {
			if (!active) {
				return;
			}
			setLoaded("loaded");
		}

		function onError() {
			if (!active) {
				return;
			}
			setLoaded("error");
		}

		const image = new Image();
		image.onload = onLoad;
		image.onerror = onError;
		image.src = src;

		return () => {
			active = false;
		};
	}, [src, dontUseNextImage]);

	return loaded;
}

interface AvatarProps {
	src?: string;
	name: string;
	size?: "small" | "bigger" | "humongous";
	dontUseNextImage?: boolean;
}

export function Avatar({
	src,
	name,
	size = "small",
	dontUseNextImage = false,
}: AvatarProps) {
	const loaded = useLoaded(src, dontUseNextImage);
	const hasImgNotFailing = src && loaded === "loaded";

	const altText = `${name}'s avatar`;
	const imageClasses = "";

	const ImageElement = dontUseNextImage ? "img" : NextImage;

	let computedSize;
	if (size === "small") computedSize = "w-30 h-30";
	else if (size === "bigger") computedSize = "w-40 h-40";
	else computedSize = "w-100 h-100";

	return (
		<div
			className={clsx(
				"MicroAvatar rounded-full bg-blue text-white flex items-center justify-center",
				computedSize
			)}
			title={altText}>
			{hasImgNotFailing ? (
				<ImageElement
					src={src}
					alt={altText}
					className={clsx(imageClasses, "w-full h-full rounded-full")}
				/>
			) : (
				<UserIcon
					className={clsx(
						imageClasses,
						"w-3/4 h-3/4 stroke-current "
					)}
				/>
			)}
		</div>
	);
}
