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

export const OnInputVSOnChange = () => {
	const [value1, setValue1] = useState("");
	const [value2, setValue2] = useState("");
	return (
		<>
			<Card className="flex flex-col p-16">
				<Typography>
					This varies in different browsers and situations, but the{" "}
					<code>onInput</code> event is always fired when the text
					inside the input element changes, whereas the{" "}
					<code>onChange</code> event will sometimes only fire once
					the element has lost focus.
				</Typography>
				<div className="flex gap-16">
					<div className="flex flex-col">
						<TextField
							label="onInput"
							value={value1}
							onInput={(newValue) => setValue1(newValue)}
							showLabel
						/>
						<Typography>{value1}</Typography>
					</div>
					<div className="flex flex-col">
						<TextField
							label="onChange"
							value={value2}
							onInput={(newValue) => setValue2(newValue)}
							showLabel
						/>
						<Typography>{value2}</Typography>
					</div>
				</div>
			</Card>
			<Typography>
				^ Inside a card so that it can be seen against the correct
				background.
			</Typography>
		</>
	);
};
