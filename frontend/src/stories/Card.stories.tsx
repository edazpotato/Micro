import { Button, Card, Divider, IconButton, Typography } from "../components";

import { Meta } from "@storybook/react";
import { MousePointer as MousePointerIcon } from "react-feather";

export default {
	component: Card,
	title: "Components/Card",
	argTypes: { onPress: { action: "click " } },
} as Meta;

export const Basic = () => (
	<Card className="p-16 flex-col">
		<Typography>Card with a button</Typography>
		<Button
			colour="blue"
			onPress={() => console.log("Clicked!")}
			text={"Button!"}
		/>
	</Card>
);

export const BasicWithDividers = () => (
	<Card>
		<div className="p-16">
			<IconButton
				icon={MousePointerIcon}
				onPress={() =>
					console.log("IconButton in card with dividers clicked!")
				}
			/>
		</div>
		<Divider vertical />
		<div className="flex-col">
			<div className="p-16">
				<Typography>Card with dividers!</Typography>
			</div>
			<Divider />
			<div className="p-16">
				<Button
					colour="blue"
					onPress={() => console.log("Clicked!")}
					text={"Button!"}
				/>
			</div>
		</div>
	</Card>
);

export const Link = () => (
	<Card
		className="p-16"
		link
		href="https://github.com/edazpotato/Micro"
		target="_blank">
		<Typography>Click me to go to something!</Typography>
	</Card>
);

export const PropagtionTesting = () => (
	<Card
		className="p-16 flex-col"
		onPress={() => console.log("Card clicked!")}>
		<Typography>Click me!</Typography>

		<Button
			colour="blue"
			onPress={() => console.log("Blutton clicked!")}
			text={"No, click me!"}
		/>

		<IconButton
			onPress={() => console.log("Icon button clicked!")}
			icon={MousePointerIcon}
		/>
	</Card>
);
