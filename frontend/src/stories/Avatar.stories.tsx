import { Avatar, Card, Typography } from "../components";

import { Meta } from "@storybook/react";
import React from "react";

export default {
	component: Avatar,
	title: "Components/Avatar",
	// argTypes: { onPress: { action: "click " } },
} as Meta;

export const Normal = () => (
	<>
		<Card className="p-16">
			<Avatar
				name="Edaz"
				src="https://github.com/edazpotato.png"
				size="small"
				dontUseNextImage
			/>
			<Avatar
				name="Edaz"
				src="https://github.com/edazpotato.png"
				size="bigger"
				dontUseNextImage
			/>
			<Avatar
				name="Edaz"
				src="https://github.com/edazpotato.png"
				size="humongous"
				dontUseNextImage
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const MissingSrcAttribute = () => (
	<>
		<Card className="p-16">
			<Avatar name="Edaz" size="small" dontUseNextImage />
			<Avatar name="Edaz" size="bigger" dontUseNextImage />
			<Avatar name="Edaz" size="humongous" dontUseNextImage />
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);
export const InvalidSrcAttribute = () => (
	<>
		<Card className="p-16">
			<Avatar
				name="Edaz"
				src="https://thiswillalwaysfail.edaz.codes/image.png"
				dontUseNextImage
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);
