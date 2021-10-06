import { Card, TextField, Typography } from "../components";
import React, { useState } from "react";

import { Meta } from "@storybook/react";

export default {
	component: TextField,
	title: "Components/TextField",
	// argTypes: { onPress: { action: "click " } },
} as Meta;

export const Normal = () => (
	<>
		<Card className="p-16">
			<TextField label="Label text" placeholder="Placeholder text" />
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const NormalDisabled = () => (
	<>
		<Card className="p-16">
			<TextField
				label="Disabled Text Field"
				placeholder="Placeholder text"
				disabled
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const LabelVisible = () => (
	<>
		<Typography>
			Normaly the label is only visible to screen-readers, in order to aid
			accessibility while not impacting the visuals.
		</Typography>
		<Card className="p-16">
			<TextField
				label="Label text"
				placeholder="Placeholder text"
				showLabel
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const Rounded = () => (
	<>
		<TextField
			label="Rounded Text Field"
			placeholder="Placeholder text"
			rounded
		/>
	</>
);

export const MultiLine = () => (
	<>
		<Card>
			<TextField
				label="Multiline Text Field"
				placeholder="Placeholder text"
				multiline
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);
export const MultiLineDisabled = () => (
	<>
		<Card>
			<TextField
				label="Disabled multiline Text Field"
				placeholder="Placeholder text"
				multiline
				disabled
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const ControlledExample = () => {
	const [value, setValue] = useState("");
	return (
		<>
			<Card className="flex-col">
				<TextField
					value={value}
					onInput={(newValue) => setValue(newValue)}
					label="Controlled Text Field"
					placeholder="Placeholder text"
				/>
				<Typography>{value}</Typography>
			</Card>
			<Typography>
				^ Inside a card so that it can be seen against the correct
				background.
			</Typography>
		</>
	);
};
