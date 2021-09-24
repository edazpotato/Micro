import { Button, Card, Typography } from "../components";

import { Meta } from "@storybook/react";
import { Plus as PlusIcon } from "react-feather";
import React from "react";

export default {
	component: Button,
	title: "Components/Button",
	argTypes: { onPress: { action: "click " } },
} as Meta;

export const Blue = () => (
	<>
		<Card className="p-16">
			<Button
				colour="blue"
				onPress={() => console.log("Clicked!")}
				text={""}>
				Blue button
			</Button>
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
			<Button colour="blue" disabled text={""}>
				Disabled button
			</Button>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const Grey = () => (
	<>
		<Card className="p-16" fullWidth>
			<Button
				colour="grey"
				onPress={() => console.log("Clicked!")}
				className="w-120"
				text={""}>
				<PlusIcon />
			</Button>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const GreyDisabled = () => (
	<>
		<Card className="p-16" fullWidth>
			<Button colour="grey" disabled className="w-120" text={""}>
				<PlusIcon />
			</Button>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);
