import { Button, ButtonColours, ButtonProps } from "../components";
import { Meta, Story } from "@storybook/react";

import { Plus as PlusIcon } from "react-feather";
import React from "react";

export default {
	component: Button,
	title: "Components/Button",
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ButtonProps> = (args) => (
	<div style={{ maxWidth: "300px" }}>
		<Button {...args} />
	</div>
);

export const Blue = Template.bind({});

Blue.args = {
	colour: ButtonColours.Blue,
	children: "Blue Button",
	onPress: () => console.log("Clicked!"),
};

export const Grey = Template.bind({});

Grey.args = {
	colour: ButtonColours.Grey,
	children: <PlusIcon />,
	onPress: () => console.log("Clicked!"),
};

export const Disabled = Template.bind({});

Disabled.args = {
	children: "Disabled Button",
	disabled: true,
};
