import { Card, IconButton, Typography } from "../components";

import { Meta } from "@storybook/react";
import React from "react";
import { User as UserIcon } from "react-feather";

export default {
	component: IconButton,
	title: "Components/IconButton",
	argTypes: { onPress: { action: "click " } },
} as Meta;

export const Normal = () => (
	<>
		<Card className="p-16">
			<IconButton
				onPress={() => console.log("Clicked!")}
				icon={UserIcon}
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const Disabled = () => (
	<>
		<Card className="p-16">
			<IconButton disabled icon={UserIcon} />
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const Chonky = () => (
	<IconButton
		chonky
		onPress={() => console.log("Clicked!")}
		icon={UserIcon}
	/>
);

export const ChonkyDisabled = () => (
	<IconButton chonky disabled icon={UserIcon} />
);
