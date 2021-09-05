import { IconButton } from "../components";
import { Meta } from "@storybook/react";
import React from "react";
import { User as UserIcon } from "react-feather";

export default {
	component: IconButton,
	title: "Components/IconButton",
	argTypes: { onPress: { action: "click " } },
} as Meta;

export const Normal = () => (
	<IconButton onPress={() => console.log("Clicked!")} icon={UserIcon} />
);

export const Disabled = () => <IconButton disabled icon={UserIcon} />;

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
