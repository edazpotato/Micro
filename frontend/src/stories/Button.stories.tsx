import { Button, ButtonColours, ButtonProps } from "../components";
import { Meta, Story } from "@storybook/react";

import { Plus as PlusIcon } from "react-feather";
import React from "react";

export default {
	component: Button,
	title: "Components/Button",
	argTypes: { onPress: { action: "click " } },
} as Meta;

export const Blue = () => (
	<Button colour={ButtonColours.Blue} onPress={() => console.log("Clicked!")}>
		Blue button
	</Button>
);

export const Disabled = () => (
	<Button colour={ButtonColours.Blue} disabled>
		Disabled button
	</Button>
);

export const Grey = () => (
	<div style={{ maxWidth: "300px" }}>
		<Button
			colour={ButtonColours.Grey}
			onPress={() => console.log("Clicked!")}
		>
			<PlusIcon />
		</Button>
	</div>
);
