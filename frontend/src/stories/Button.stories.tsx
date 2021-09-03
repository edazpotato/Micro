import { Button, ButtonProps, ButtonVariants } from "../components";
import { Meta, Story } from "@storybook/react";

import React from "react";

export default {
	component: Button,
	title: "Components/Button",
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	variant: ButtonVariants.primary,
	label: "Primary Button",
	link: false,
	disabled: false,
	onPress: () => console.log("Clicked!"),
};

export const Disabled = Template.bind({});

Disabled.args = {
	variant: ButtonVariants.primary,
	label: "Disabled Button",
	link: false,
	disabled: true,
	onPress: () => console.log("Clicked!"),
};
