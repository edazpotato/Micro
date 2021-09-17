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
			/>
			<Avatar
				name="Edaz"
				src="https://github.com/edazpotato.png"
				size="bigger"
			/>
			<Avatar
				name="Edaz"
				src="https://github.com/edazpotato.png"
				size="humongous"
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const MissingSrc = () => (
	<>
		<Card className="p-16">
			<Avatar name="Edaz" size="small" />
			<Avatar name="Edaz" size="bigger" />
			<Avatar name="Edaz" size="humongous" />
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);
